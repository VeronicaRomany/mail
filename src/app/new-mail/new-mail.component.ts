import { Component, OnInit } from '@angular/core';

import { FileUploadService } from '../file-upload/file-upload.service';
let  mails: NewMail[]=[];
export class NewMail {
  constructor() { 
    this.sender=""
    this.reciever=""
    this.subject=""
    this.body=""
    this.attachement=""
    this.priority=0;

  }
  sender: string;
  reciever :string;
  subject:string;
  body:string; 
  attachement:string;
  priority:any;
  date:any;
}
const m = new NewMail()
@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})

export class NewMailComponent implements OnInit {
  public attach="";

  constructor() { }
 
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
    console.log(m)
   
   
     
   }
}
