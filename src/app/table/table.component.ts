import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Globals } from 'src/globals';

export class NewMail {
  constructor() { 
    this.fromEmail=""
    this.toEmail=""
    this.subject=""
    this.body=""
    this.attachement=[]
    this.priority=0;
    this.id=0;
  }
  fromEmail: string;
  toEmail :string;
  subject:string;
  body:string; 
  attachement:Array<string>;
  priority:any;
  date:any;
  id:number;
}

export class filter{
  constructor(){
    this.Date=""
    this.priority=0
    this.receiver=""
    this.sender=""
    this.subject=""
  }
  subject:string;
  sender:string;
  receiver:string;
  Date:string;
  priority:number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
userID:string=""
emails: NewMail[]=[];
 messageviewsender:String=""
 messageviewsubject:String=""
 messageviewmail:String=""
 messageviewdate:String=""
 messageviewattachment:Array<String>=[]
 messageviewpriority:String=""|| ''
 lastId:number | undefined
 multiMails:string=""
 senderFlag:boolean=false;
 subjectFlag:boolean=false;
 priorityFlag:boolean=false;
 confirmsenderFlag:boolean=false;
 confirmsubjectFlag:boolean=false;
 confirmpriorityFlag:boolean=false;
 filter:boolean=false;

 sortSelector:string="";

 selected:any=[]
 isSomethingSelected:boolean=false;
  constructor(private http:HttpClient,private router : Router,public globals: Globals) { 
    console.log("const table")
    this.userID= this.globals.userID
    console.log(this.userID)
    this.getinbox()
  }
  
 
  ngOnInit(): void {
    
  }

  SortBy(){
    this.sortSelector= ((document.getElementById("sort") as HTMLInputElement).value);
    console.log(this.sortSelector)
    this.http.get("http://localhost:8080/server/mail/sort",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"inbox",
      criteria: this.sortSelector
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
      this.emails=[]
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.emails.push(jsonArr[i])
      console.log(this.emails)
     }
    })
  }

  filterBy(){
    this.filter=!this.filter;
    if(this.filter){
    this.senderFlag=true;
    this.subjectFlag=true;
    this.priorityFlag=true;
    console.log("on")
    }else{
      this.stopFilter()
      console.log("off")
    }
    
  }
  filterConfirmation(){
    var sender;
    var subject;
    var pr;
    var priority;
    if(this.confirmsenderFlag){
        sender= ((document.getElementById("senderFilter") as HTMLInputElement).value);
      
    }else{
      sender =""
    }
    
    if(this.confirmsubjectFlag){
      subject= ((document.getElementById("subjectFilter") as HTMLInputElement).value);
     
    }else{
      subject=""
    }
    
    if(this.confirmpriorityFlag){
        priority= ((document.getElementById("priority") as HTMLInputElement).value);
      
      if(priority=="Urgent"){
        pr=4
      }else if(priority=="High"){
        pr=3
      }else if(priority=="Medieum"){
        pr=2
      }else{
        pr=1
      }
     
     
    }else{
      pr=0
    }
   
    let f = new filter()
    f.subject=subject
    f.sender=sender
    f.priority=pr
    console.log(f)

   // var x= JSON.stringify(f)
   // console.log(x)
    this.http.get("http://localhost:8080/server/mail/filter",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"inbox",
      filtersJSON:JSON.stringify(f)
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
     this.emails=[]
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.emails.push(jsonArr[i])
      console.log(this.emails)
     }
    })
  }

  stopFilter(){
    this.confirmpriorityFlag=false;
    this.confirmsenderFlag=false;
    this.confirmsubjectFlag=false;
    this.senderFlag=false;
    this.subjectFlag=false;
    this.priorityFlag=false;
    this.filter=false;
    this.emails=[]
    this.getinbox()
  }
  joinFilterBySender(event: any){
    if (event.target.checked) {
      this.confirmsenderFlag=true;
  }else{
    this.confirmsenderFlag=false;
  }
}
  joinFilterBySubject(event: any){
    if (event.target.checked) {
      this.confirmsubjectFlag=true
    }else{
      this.confirmsubjectFlag=false;
    }
  }

  joinFilterByPriority(event: any){
    if (event.target.checked) {

      this.confirmpriorityFlag=true
   }else{
    this.confirmpriorityFlag=false;
   }
  }

   

  view(ID:number){
    this.lastId=ID
    console.log(ID)
    const index = this.emails.findIndex(item => item.id === ID);
    console.log(index)
    this.messageviewsender="From : \t"+this.emails[index].fromEmail;
    this.messageviewsubject="Subject : \t"+this.emails[index].subject;
    this.messageviewdate="Date :\t"+this.emails[index].date; 
    this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index].priority)
    this.messageviewmail=this.emails[index].body; 
    for(let i=0 ; i< this.emails[index].attachement.length;i++){
      this.messageviewattachment.push(this.emails[index].attachement[i])
    }
  //  this.messageviewattachment=this.emails[index].attachement
  } 
  changepriority(prioritynum : String){ 
    var pr =""
    if(prioritynum=="1"){ 
      pr="Low"
      return pr

    }else if(prioritynum=="2"){
      
      pr="Medium"
      return pr

    }else if(prioritynum=="3"){
      
      pr="High"
      return pr

    }else{
 
      
      pr="Urgent"
      return pr
    }


  }
  msg(sender:string){
    console.log(sender)
  }
  viewNext(ID:any){
    console.log(ID)
    const index = this.emails.findIndex(item => item.id=== ID);
    console.log(index)
    if(index!=this.emails.length-1){
      this.messageviewsender="From : \t"+this.emails[index+1].fromEmail;
      this.messageviewsubject="Subject : \t"+this.emails[index+1].subject;
      this.messageviewdate="Date :\t"+this.emails[index+1].date; 
      this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index+1].priority)
      this.messageviewmail=this.emails[index+1].body; 
      
      this.messageviewattachment.length=0
      console.log(this.emails[index+1].attachement.length)
      for(let i = 0 ; i<this.emails[index+1].attachement.length ;i++){
      this.messageviewattachment.push(this.emails[index+1].attachement[i])
      }
      this.lastId=this.emails[index+1].id
    }
  }
  viewPrev(ID:any){
    const index = this.emails.findIndex(item => item.id === ID);
    if(index!=0){
      this.messageviewsender="From : \t"+this.emails[index-1].fromEmail;
      this.messageviewsubject="Subject : \t"+this.emails[index-1].subject;
      this.messageviewdate="Date :\t"+this.emails[index-1].date; 
      this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index-1].priority)
      this.messageviewmail=this.emails[index-1].body; 
      
    //  this.messageviewattachment.length=0
      console.log(this.emails)
      console.log(this.emails[index-1].attachement.length)
      for(let i = 0 ; i<this.emails[index-1].attachement.length ;i++){
        this.messageviewattachment.push(this.emails[index-1].attachement[i])
        }
      this.lastId=this.emails[index-1].id
    }
  }

  multipleMails(){
   this.multiMails=""
    for(var i=0 ; i<this.selected.length;i++){
      if (i==0){
        this.multiMails=this.selected[i].id
      }else{
        this.multiMails=this.multiMails+" , "+this.selected[i].id
      }
    }
    console.log(this.multiMails)
    this.isSomethingSelected=false;
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

  delete(ID:number){

   this.http .delete('http://localhost:8080/server/mail/delete',{responseType:'text',
   params:{
    id: this.globals.userID,
    messageID:ID,
    collection:"inbox"
  }}).subscribe((s:any) => {
         console.log(s);
         this.emails=[]
         this.getinbox()
      });
  }

  getinbox(){
    this.emails=[];
    //y
   // ((document.getElementById("search") as HTMLInputElement).value)="";
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userID:this.userID,
      folder:"inbox"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     this.emails=[]
     for(var i in jsonArr){
       this.emails.push(jsonArr[i])
       console.log(this.emails)
     }
    })
  }
  
 Search(){
   var word=  ((document.getElementById("search") as HTMLInputElement).value);
   console.log(word)
  this.http.get("http://localhost:8080/server/mail/search",{responseType:'text',
  params:{
    userID:this.userID,
    folder:"inbox",
    searchWord: word
  },observe:'response'

  }).subscribe((data:any) =>{
    console.log(data.body)
  
   var jsonstr:string=data.body;
   let jsonArr=JSON.parse(jsonstr)
   this.emails=[]
   for(var i in jsonArr){

     this.emails.push(jsonArr[i])
     console.log(this.emails)
   }
  })
  
 }
}
