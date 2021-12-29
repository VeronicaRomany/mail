import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { Globals } from 'src/globals';
export class Contact {
  constructor(){
       this.contactName="",
       this.contactAdresses= [],
       this.contactID=0
  }
  contactName : string;
  contactAdresses: Array<string>;
  contactID:number;
}
export class NewContact{
  constructor(){
    this.name=""
    this.mail1=""
    this.mail2=""
  }
  name : string;
  mail1: string;
  mail2:string;
}

const con = new NewContact();

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  userID: string;
  
  constructor(private http:HttpClient,private router : Router,public globals: Globals) { 
    this.userID= this.globals.userID
    this.getcontact()
  }

  contacts: Contact[]=[];
  anotherMail:any
  sortSelector:string=""
  isSomethingSelected:boolean=false;
  multiMails:string=""
  EDIT:boolean=false;
  INDEX:number=0;
  deleteThisIDs:any=[]
  selected:any=[]
  getcontact(){
    console.log("sasasas")
    this.contacts=[]
    this.http.get("http://localhost:8080/server/user/getContacts",{responseType:'text',
    params:{
      userID:this.userID,
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     this.contacts=[]
     for(var i in jsonArr){
       this.contacts.push(jsonArr[i])
       console.log(this.contacts)
     }
    })
  }
  whichChangeTodo(){
    let change = ((document.getElementById("selection") as HTMLInputElement).value)
    if(change=="send"){
      this.multipleMails()
    }if(change=="delete"){
      this.DeleteSelectedContacts()
    }
  }

  DeleteSelectedContacts(){
   
     for(var i=0 ; i<this.selected.length;i++){
        this.deleteThisIDs.push(this.selected[i].id)
     }
     console.log(this.deleteThisIDs)
        this.contacts=[]
     // hna hn3ml delete request ll contacts then hn3ml request y get al contacts
     this.isSomethingSelected=false;
  }
  multipleMails(){
    this.multiMails=""
     for(var i=0 ; i<this.selected.length;i++){
       for(var j=0 ; j<this.selected[i].contactAdresses.length;j++){
        if (i==0 && j==0){
          this.multiMails=this.selected[i].contactAdresses[j]
          console.log(this.multiMails)
        }else{
          this.multiMails=this.multiMails+" , "+this.selected[i].contactAdresses[j]
          console.log(this.multiMails)
        }
       }
     }
     console.log(this.multiMails)
     this.msg(this.multiMails)
     this.isSomethingSelected=false;
   }

   toggleEditable(event: any,ID:number) {
    if ( event.target.checked ) {
       this.isSomethingSelected=true;
       const index = this.contacts.findIndex(item => item.contactID === ID);
       this.selected.push(this.contacts[index])
       console.log(this.selected)
   }else{
    const index = this.contacts.findIndex(item => item.contactID === ID);
    this.selected.pop(this.contacts[index])
    console.log(this.selected)
    if(this.selected.length==0){
      this.isSomethingSelected=false;
    }
   }
  }

  ngOnInit(): void { 
  }

  SortBy(){
    
    console.log(this.sortSelector)
    this.contacts=[]
    //request sort
    this.http.get("http://localhost:8080/server/user/sortContacts",{responseType:'text',
 
  params:{
    userID:this.userID,
    
  },observe:'response'
    }).subscribe((data:any) =>{
      console.log(data.body)
      
      this.contacts=[]
      console.log(data.body)
  
   var jsonstr:string=data.body;
   let jsonArr=JSON.parse(jsonstr)
   this.contacts=[]
   for(var i in jsonArr){

     this.contacts.push(jsonArr[i])
     console.log(this.contacts)
   }
    })

  }

msg(mail:string){
 this.router.navigate(['/NewMail'], { state: { reciever: mail }})
}

startEdit(id:number){
  this.EDIT=true;
  const index = this.contacts.findIndex(item => item.contactID === id);
  this.INDEX=index;
}

delete(ID:any){
  this.http .delete('http://localhost:8080/server/user/deleteContact',{responseType:'text',
  params:{
    userID: this.globals.userID,
    contactID:ID
 
 }}).subscribe((s:any) => {
        console.log(s);
        this.contacts=[]
        this.getcontact()
     });
}

confirmEdit(){
  var  newest= ((document.getElementById("edit") as HTMLInputElement).value);
  console.log(newest)
  this.contacts[this.INDEX].contactName=newest
  console.log(this.contacts[this.INDEX].contactName)
  // request b al id w alt3del 

  this.http.get("http://localhost:8080/server/user/editContact",{responseType:'text',
 
  params:{
    userID:this.userID,
    contactID:this.contacts[this.INDEX].contactID,
    newName: newest
  },observe:'response'
    }).subscribe((data:any) =>{
      console.log(data.body)
      this.EDIT=false;
      this.contacts=[]
     this.getcontact()
    })
  
}

openForm() {
 document.getElementById("myForm")!.style.display = "block";
}

closeForm() {
  document.getElementById("myForm")!.style.display = "none";
}

newContact(){
  const newCon = new Contact();
  newCon.contactName= ((document.getElementById("Name") as HTMLInputElement).value);
  newCon.contactAdresses.push(((document.getElementById("Mail") as HTMLInputElement).value));
  if(this.anotherMail){
    newCon.contactAdresses.push(((document.getElementById("Mail2") as HTMLInputElement).value));
  
  }
  console.log(newCon)
  //send request with con
  
  this.http.get("http://localhost:8080/server/user/addContact",{responseType:'text',
 
  params:{
    userID:this.userID,
    contactJSON:JSON.stringify(newCon)
  },observe:'response'
    }).subscribe((data:any) =>{
      console.log(data.body)
    
    this.getcontact()
    })
 
}

NewInput(){
  this.anotherMail=true
}

toggle(){
  this.anotherMail=!this.anotherMail
}

searchabout(){
  let wordToSearch=((document.getElementById("search") as HTMLInputElement).value);
  console.log(wordToSearch)
  this.contacts=[]
  //request search
  this.http.get("http://localhost:8080/server/user/searchContacts",{responseType:'text',
 
  params:{
    userID:this.userID,
    searchWord:wordToSearch
  },observe:'response'
    }).subscribe((data:any) =>{
      console.log(data.body)
      
      this.contacts=[]
      console.log(data.body)
  
   var jsonstr:string=data.body;
   let jsonArr=JSON.parse(jsonstr)
   this.contacts=[]
   for(var i in jsonArr){

     this.contacts.push(jsonArr[i])
     console.log(this.contacts)
   }
    })

}

endsearch(){
 // ((document.getElementById("search") as HTMLInputElement).value)=""
  //request get contact
  this.getcontact()
}
}
