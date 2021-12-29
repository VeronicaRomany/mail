import { Component, OnInit } from '@angular/core';
import { NewMail } from '../table/table.component';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/globals';
import { filter } from '../table/table.component';
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
  
  messageviewdate:String=""
  messageviewattachment:String=""
  messageviewpriority:String=""|| ''
  lastId:number=0


  select :boolean=false;
  selected:any=[]
  senderFlag:boolean=false;
  recieverFlag:boolean=false;
  subjectFlag:boolean=false;
  priorityFlag:boolean=false;
  confirmsenderFlag:boolean=false;
  confirmrecieverFlag:boolean=false;
  confirmsubjectFlag:boolean=false;
  confirmpriorityFlag:boolean=false;
  filter:boolean=false;
  sortSelector:string="";
  isSomethingSelected:boolean=false;


  SortBy(){
    this.sortSelector= ((document.getElementById("sort") as HTMLInputElement).value);
    console.log(this.sortSelector)
    this.http.get("http://localhost:8080/server/mail/sort",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"sent",
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
    this.recieverFlag=true;
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
    var reciever;
   

    if(this.confirmrecieverFlag){
      reciever= ((document.getElementById("recieverFilter") as HTMLInputElement).value);
     
    }else{
      reciever=""
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
   
    f.priority=pr
    f.receiver=reciever
    console.log(f)

    var x= JSON.stringify(f)
    console.log(x)
    this.http.get("http://localhost:8080/server/mail/filter",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"sent",
      filtersJSON: x
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     this.emails=[]
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
    this.confirmrecieverFlag=false;
    this.senderFlag=false;
    this.subjectFlag=false;
    this.priorityFlag=false;
    this.recieverFlag=false;
    this.filter=false;
    this.emails=[]
    this.getsent()
  }
  joinFilterBySender(event: any){
    if (event.target.checked) {
      this.confirmsenderFlag=true;
  }else{
    this.confirmsenderFlag=false;
  }
}

joinFilterByReciever(event: any){
  if (event.target.checked) {
    this.confirmrecieverFlag=true;
}else{
  this.confirmrecieverFlag=false;
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
     this.messageviewdate="Date :\t"+this.emails[index].date; 
     this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index].priority)
     this.messageviewmail=this.emails[index].body; 
     this.messageviewattachment=this.emails[index].attachement
     
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

   msg(name:string){
     console.log(name)
   }
   viewNext(ID:any){
     const index = this.emails.findIndex(item => item.id === ID);
     if(index!=this.emails.length-1){
       this.messageviewname="From: \t"+this.emails[index+1].toEmail;
       this.messageviewsubject="Subject: \t"+this.emails[index+1].subject;
       
       
       this.messageviewdate="Date :\t"+this.emails[index+1].date; 
       this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index+1].priority)
       this.messageviewmail=this.emails[index+1].body; 
       this.messageviewattachment=this.emails[index+1].attachement
       this.lastId=this.emails[index+1].id
     }
   }
   viewPrev(ID:any){
     const index = this.emails.findIndex(item => item.id === ID);
     if(index!=0){
       this.messageviewname="From: \t"+this.emails[index-1].toEmail;
       this.messageviewsubject="Subject: \t"+this.emails[index-1].subject;
       
       this.messageviewdate="Date :\t"+this.emails[index-1].date; 
       this.messageviewpriority="Priority : \t"+this.changepriority(this.emails[index-1].priority)
       this.messageviewmail=this.emails[index-1].body; 
       this.messageviewattachment=this.emails[index-1].attachement
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
    this.emails=[]
    console.log("sasasas");
   // ((document.getElementById("search") as HTMLInputElement).value)="";
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
 
  Search(){
    var word=  ((document.getElementById("search") as HTMLInputElement).value);
    console.log(word)
   this.http.get("http://localhost:8080/server/mail/search",{responseType:'text',
   params:{
     userID:this.globals.userID,
     folder:"sent",
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
