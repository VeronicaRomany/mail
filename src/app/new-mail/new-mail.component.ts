import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

let  mails: NewMail[]=[];
export class NewMail {
  constructor() { 
    this.fromEmail=""
    this.toEmail=""
    this.subject=""
    this.body=""
    this.attachement=""
    this.priority=0;
    this.ID=0;
  }
  fromEmail: string;
  toEmail :string;
  subject:string;
  body:string; 
  attachement:string;
  priority:any;
  date:any;
  ID:number;
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
  x:string=""
 
  constructor(private router : Router) { 
    
      this.text=  this.router.getCurrentNavigation()!.extras.state?.['Mail'] as string
      this.to=  this.router.getCurrentNavigation()!.extras.state?.['reciever'] as string
      this.sub=  this.router.getCurrentNavigation()!.extras.state?.['head'] as string
      this.x= this.router.getCurrentNavigation()!.extras.state?.['importance'] as string

   
  }



  ngOnInit(): void { 
    var pr= ((document.getElementById("priority") as HTMLInputElement));
    pr.value=this.x

  }

  mail1(){
    console.log(this.attach)
    var  t= ((document.getElementById("Too") as HTMLInputElement).value);
    var  s= ((document.getElementById("Subj") as HTMLInputElement).value);
    var  txt= ((document.getElementById("Text") as HTMLInputElement).value);
    var pr= ((document.getElementById("priority") as HTMLInputElement).value);
    
    m.priority=pr
    m.toEmail=t
    m.subject=s
    m.body=txt
    m.attachement=this.attach
    m.date=new Date()
    m.ID=0
    console.log(m)
   
   }

   draft(){
    console.log(this.attach)
    var  t= ((document.getElementById("Too") as HTMLInputElement).value);
    var  s= ((document.getElementById("Subj") as HTMLInputElement).value);
    var  txt= ((document.getElementById("Text") as HTMLInputElement).value);
    var pr= ((document.getElementById("priority") as HTMLInputElement).value);
    
    m.priority=pr
    m.toEmail=t
    m.subject=s
    m.body=txt
    m.attachement=this.attach
    m.date=new Date()
    m.ID=0
    console.log(m)
   }
}
