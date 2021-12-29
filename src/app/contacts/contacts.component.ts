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
  /*Contacts = [
    {contactName:"Mark", contactAdresses: ["mark@oop.com","Markoo@oop.com"] , contactId:1},
    {contactName:"Tony",contactAdresses: ["t@oop.com"],contactId: 2},
    {contactName:"veroo", contactAdresses: ["vr@oop.com","vecoo@oop"], contactId: 3}
  ]*/
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
       for(var j=0 ; j<this.selected[i].Accounts.length;j++){
        if (i==0 && j==0){
          this.multiMails=this.selected[i].Accounts[j]
        }else{
          this.multiMails=this.multiMails+" , "+this.selected[i].Accounts[j]
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
    this.sortSelector= ((document.getElementById("sort") as HTMLInputElement).value);
    console.log(this.sortSelector)
    this.contacts=[]
    //request sort
  }

msg(mail:string){
 this.router.navigate(['/NewMail'], { state: { reciever: mail }})
}

startEdit(id:number){
  this.EDIT=true;
  const index = this.contacts.findIndex(item => item.contactID === id);
  this.INDEX=index;
}

confirmEdit(){
  var  newest= ((document.getElementById("edit") as HTMLInputElement).value);
  console.log(newest)
  this.contacts[this.INDEX].contactName=newest
  console.log(this.contacts[this.INDEX].contactName)
  // request b al id w alt3del 
  this.EDIT=false;
}

openForm() {
 document.getElementById("myForm")!.style.display = "block";
}

closeForm() {
  document.getElementById("myForm")!.style.display = "none";
}

newContact(){
  con.name= ((document.getElementById("Name") as HTMLInputElement).value);
  con.mail1= ((document.getElementById("Mail") as HTMLInputElement).value);
  if(this.anotherMail){
    con.mail2=((document.getElementById("Mail2") as HTMLInputElement).value);
  }else{
    con.mail2=""
  }
  
 
  console.log(con)
  //send request with con
  // send request get contact
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
}

endsearch(){
  ((document.getElementById("search") as HTMLInputElement).value)=""
  //request get contact
}
}
