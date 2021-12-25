import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
export class Contact{
  constructor(){
    this.name=""
    this.mail=""
  }
  name : string;
  mail : string
}

const con = new Contact();
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  anotherMail:any
   
  Contacts = [
    {name:"Mark", Accounts: ["mark@oop.com","Markoo@oop.com"]},
    {name:"Tony", Accounts: ["t@oop.com"]}
  ]
  ngOnInit(): void { 
  }

msg(mail:string){
  
  this.router.navigate(['/NewMail'], { fragment:mail });
}

openForm() {
 document.getElementById("myForm")!.style.display = "block";
}

closeForm() {
  document.getElementById("myForm")!.style.display = "none";
}

newContact(){
  var  NAME= ((document.getElementById("Name") as HTMLInputElement).value);
  var  MAIL= ((document.getElementById("Mail") as HTMLInputElement).value);
  
  con.mail=MAIL
  con.name=NAME
  console.log(con)
}

NewInput(){
  this.anotherMail=true
}

toggle(){
  this.anotherMail=!this.anotherMail
}
}
