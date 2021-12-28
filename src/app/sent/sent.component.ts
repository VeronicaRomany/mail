import { Component, OnInit } from '@angular/core';
import { NewMail } from '../table/table.component';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/globals';
@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  emails: NewMail[]=[];
  messageviewname:String=""
  messageviewsubject:String=""
  messageviewmail:String=""
  lastId:number=0


  isSomethingSelected:boolean=false;
  selected:any=[]

  deleteSelected(){
    // send array selected f request
    this.emails=[]
    this.getsent()
   }
  
   toggleEditable(event: any,ID:number) {
    console.log(ID)
      if ( event.target.checked ) {
         this.isSomethingSelected=true;
         const index = this.emails.findIndex(item => item.id === ID);
         this.selected.push(this.emails[index])
         console.log(this.selected)
     }else{
      const index = this.emails.findIndex(item => item.id === ID);
      this.selected.pop(this.emails[index])
      console.log(this.selected)
      if(this.selected.length==0){
        this.isSomethingSelected=false;
      }
     }
  }
   constructor( private http : HttpClient,public globals: Globals) { 
    this.getsent()
   }
   
   
   ngOnInit(): void {
   }
   
 
   view(x:any){
     this.lastId=x
     const index = this.emails.findIndex(item => item.id === x);
     this.messageviewname="From : \t"+this.emails[index].toEmail;
     this.messageviewsubject="Subject : \t"+this.emails[index].subject;
     this.messageviewmail=this.emails[index].body;
   }

   msg(name:string){
     console.log(name)
   }
   viewNext(ID:any){
     const index = this.emails.findIndex(item => item.id === ID);
     if(index!=this.emails.length-1){
       this.messageviewname="From: \t"+this.emails[index+1].toEmail;
       this.messageviewsubject="Subject: \t"+this.emails[index+1].subject;
       this.messageviewmail=this.emails[index+1].body;
       this.lastId=this.emails[index+1].id
     }
   }
   viewPrev(ID:any){
     const index = this.emails.findIndex(item => item.id === ID);
     if(index!=0){
       this.messageviewname="From: \t"+this.emails[index-1].toEmail;
       this.messageviewsubject="Subject: \t"+this.emails[index-1].subject;
       this.messageviewmail=this.emails[index-1].body;
       this.lastId=this.emails[index-1].id
     }
   }
 
   
 
   delete(ID:any){
    
     
    this.http .delete('http://localhost:8080/server/mail/delete',{responseType:'text',
    params:{
     id: this.globals.userID,
     messageID:ID,
     collection:"sent"
   }}).subscribe((s:any) => {
          console.log(s);
          this.emails=[]
          this.getsent()
       });
    
 
   }
  getsent(){
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"sent"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     this.emails=[]
     console.log(jsonArr)
     for(var i in jsonArr){
       this.emails.push(jsonArr[i])
     }
     console.log(this.emails)
    })
  }
 

}
