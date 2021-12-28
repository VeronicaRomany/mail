import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NewMail} from'../table/table.component'
import { Globals } from 'src/globals';
let  mails: NewMail[]=[];
const m = new NewMail()
let fromMail:string=""
@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css'],
 
})

export class NewMailComponent implements OnInit {
  
  public attach="";
 
  to:string=""
  sub:string=""
  text:string=""
  x:string=""
 
 
  constructor(private router : Router , private http:HttpClient,public globals: Globals) { 
    
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
    var prio:number;
    if(pr=="Urgent"){
      prio=4
    }else if(pr=="High"){
      prio=3
    }else if(pr=="Medieum"){
      prio=2
    }else{
      prio=1
    }
    m.priority=prio
  
    m.toEmail=t
    m.subject=s
    m.body=txt
    m.attachement=this.attach
    m.date=new Date()
    m.id=0
    m.fromEmail=this.globals.getmail()
    console.log(m)
    var jsonString = JSON.stringify(m);
    this.http.post("http://localhost:8080/server/mail/send",jsonString,{responseType:'text'}).subscribe((data:any) =>{
      console.log(data)
    
  
    })
   }

   draft(){
    console.log(this.attach)
    var  t= ((document.getElementById("Too") as HTMLInputElement).value);
    var  s= ((document.getElementById("Subj") as HTMLInputElement).value);
    var  txt= ((document.getElementById("Text") as HTMLInputElement).value);
    var pr= ((document.getElementById("priority") as HTMLInputElement).value);
    
    var prio:number;
    if(pr=="Urgent"){
      prio=4
    }else if(pr=="High"){
      prio=3
    }else if(pr=="Medieum"){
      prio=2
    }else{
      prio=1
    }
    m.priority=prio
    m.toEmail=t
    m.subject=s
    m.body=txt
    m.attachement=this.attach
    m.date=new Date()
    m.id=0
    m.fromEmail=this.globals.fromEmail
    console.log(m)
    var jsonString = JSON.stringify(m);
    this.http.post("http://localhost:8080/server/mail/addToDraft",jsonString,{responseType:'text'}).subscribe((data:any) =>{
      console.log(data)
    })
   }
}
