import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

let  mails: NewMail[]=[];
export class NewMail {
  constructor() { 
    this.sender=""
    this.reciever=""
    this.subject=""
    this.body=""
    this.attachement=""
    this.priority=0;
    this.id=0;
  }
  sender: string;
  reciever :string;
  subject:string;
  body:string; 
  attachement:string;
  priority:any;
  date:any;
  id:number;
}
const m = new NewMail()
@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})

export class NewMailComponent implements OnInit {
  public attach="";
 
  to:string=""
  sub:string=""
  text:string=""
  counter:number=0
  constructor(private router : Router) { 
    
      this.text=  this.router.getCurrentNavigation()!.extras.state?.['Mail'] as string
      this.to=  this.router.getCurrentNavigation()!.extras.state?.['reciever'] as string
      this.sub=  this.router.getCurrentNavigation()!.extras.state?.['head'] as string
    //this.c=  this.router.getCurrentNavigation().extras.state.Mail
   
  }

  ngOnInit(): void { 
  }
  mail1(){
    console.log(this.attach)
    var  t= ((document.getElementById("Too") as HTMLInputElement).value);
    var  s= ((document.getElementById("Subj") as HTMLInputElement).value);
    var  txt= ((document.getElementById("Text") as HTMLInputElement).value);
    var pr= ((document.getElementById("priority") as HTMLInputElement).value);
    
    m.priority=pr
    m.reciever=t
    m.subject=s
    m.body=txt
    m.attachement=this.attach
    m.date=new Date()
    m.id=this.counter
    console.log(m)
    this.counter=this.counter+1
   }
}
