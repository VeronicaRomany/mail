import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
export class Contact{
  constructor(){
    this.name=""
    this.mail1=""
    this.mail2=""
  }
  name : string;
  mail1: string;
  mail2:string;
}

const con = new Contact();
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  
  constructor(private router: Router, private route: ActivatedRoute) { }
  Contacts = [
    {name:"Mark", Accounts: ["mark@oop.com","Markoo@oop.com"] , id :"1"},
    {name:"Tony", Accounts: ["t@oop.com"], id: "2"},
    {name:"veroo", Accounts: ["vr@oop.com","vecoo@oop"], id: "3"}
  ]
  anotherMail:any
  sortSelector:string=""
  isSomethingSelected:boolean=false;
  multiMails:string=""
  EDIT:boolean=false;
  INDEX:number=0;
  deleteThisIDs:any=[]
  selected:any=[]

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

   toggleEditable(event: any,ID:string) {
    if ( event.target.checked ) {
       this.isSomethingSelected=true;
       const index = this.Contacts.findIndex(item => item.name === ID);
       this.selected.push(this.Contacts[index])
       console.log(this.selected)
   }else{
    
    
    const index = this.Contacts.findIndex(item => item.name === ID);
    this.selected.pop(this.Contacts[index])
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
  }

msg(mail:string){
 this.router.navigate(['/NewMail'], { state: { reciever: mail }})
}

startEdit(id:string){
  this.EDIT=true;
  const index = this.Contacts.findIndex(item => item.id === id);
  this.INDEX=index;
  
}

confirmEdit(){
  var  newest= ((document.getElementById("edit") as HTMLInputElement).value);
  console.log(newest)
  this.Contacts[this.INDEX].name=newest
  console.log(this.Contacts[this.INDEX].name)
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
}
