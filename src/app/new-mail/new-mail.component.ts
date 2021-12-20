import { Component, OnInit } from '@angular/core';
let  mails: NewMail[]=[];
export class NewMail {
  constructor() { 
    this.sender=""
    this.subject=""
    this.text=""
  }
  sender: string;
  subject:string;
  text:string; 
}

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})

export class NewMailComponent implements OnInit {
  sender="";
  subject=""
  text = "";

  constructor() { }
 
  ngOnInit(): void {
   
  
  }
  mail1(){
    var  t= ((document.getElementById("Too") as HTMLInputElement).value);
    var  s= ((document.getElementById("Subj") as HTMLInputElement).value);
    var  txt= ((document.getElementById("Text") as HTMLInputElement).value);
    
    const m = new NewMail()
    //m.sender= t.textContent
   m.sender= t;
   m.subject=s;
   m.text=txt;
   mails.push(m)
   //console.log(mails)
   
     
   }
}
