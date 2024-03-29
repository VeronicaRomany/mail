import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewMail } from '../table/table.component';
import { Globals } from 'src/globals';
import { filter } from '../table/table.component';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  trash: NewMail[]=[];
  messageviewname:String=""
  messageviewsubject:String=""
  messageviewmail:String=""
  messageviewdate:String=""
  messageviewattachment:Array<String>=[]
  messageviewpriority:String=""|| ''
  lastId:number | undefined
  multiMails:string=""
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
   constructor(private http : HttpClient,public globals: Globals) {
      this.getTrash();
    }
   
   ngOnInit(): void {
   }
   getTrash(){
    console.log("sasasas")
    this.trash=[];
   // ((document.getElementById("search") as HTMLInputElement).value)="";
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"trash"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     this.trash=[];
     for(var i in jsonArr){
       this.trash.push(jsonArr[i])
     }
    })
  }
    
 
  SortBy(){
    this.sortSelector= ((document.getElementById("sort") as HTMLInputElement).value);
    console.log(this.sortSelector)
    this.http.get("http://localhost:8080/server/mail/sort",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"trash",
      criteria: this.sortSelector
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
      this.trash=[]
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.trash.push(jsonArr[i])
      console.log(this.trash)
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
    if(this.confirmsenderFlag){
        sender= ((document.getElementById("senderFilter") as HTMLInputElement).value);
      
    }else{
      sender =""
    }

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
    f.sender=sender
    f.priority=pr
    f.receiver=reciever
    console.log(f)

    var x= JSON.stringify(f)
    console.log(x)
    this.http.get("http://localhost:8080/server/mail/filter",{responseType:'text',
    params:{
      userID:this.globals.userID,
      folder:"trash",
      filtersJSON: x
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    this.trash=[]
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.trash.push(jsonArr[i])
      console.log(this.trash)
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
    this.trash=[]
    this.getTrash()
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

     
   view(ID:any){
     this.lastId=ID
     const index = this.trash.findIndex(item => item.id === ID);
     this.messageviewname="From : \t"+this.trash[index].fromEmail;
     this.messageviewsubject="Subject : \t"+this.trash[index].subject;
     
     this.messageviewdate="Date :\t"+this.trash[index].date; 
     this.messageviewpriority="Priority : \t"+this.changepriority(this.trash[index].priority)
     this.messageviewmail=this.trash[index].body; 
     for(let i=0 ; i< this.trash[index].attachement.length;i++){
      this.messageviewattachment.push(this.trash[index].attachement[i])
    }
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
     const index = this.trash.findIndex(item => item.id === ID);
     if(index!=this.trash.length-1){
       this.messageviewname="From: \t"+this.trash[index+1].fromEmail;
       this.messageviewsubject="Subject: \t"+this.trash[index+1].subject;
       this.messageviewdate="Date :\t"+this.trash[index+1].date; 
       this.messageviewpriority="Priority : \t"+this.changepriority(this.trash[index+1].priority)
       this.messageviewmail=this.trash[index+1].body; 
      // this.messageviewattachment.length=0
      this.messageviewattachment=[]
       for(let i = 0 ; i<this.trash[index+1].attachement.length ;i++){
        this.messageviewattachment.push(this.trash[index+1].attachement[i])
        }
       
       this.lastId=this.trash[index+1].id
     }
   }
   viewPrev(ID:any){
     const index = this.trash.findIndex(item => item.id === ID);
     if(index!=0){
       this.messageviewname="From: \t"+this.trash[index-1].fromEmail;
       this.messageviewsubject="Subject: \t"+this.trash[index-1].subject;
       this.messageviewdate="Date :\t"+this.trash[index-1].date; 
       this.messageviewpriority="Priority : \t"+this.changepriority(this.trash[index-1].priority)
       this.messageviewmail=this.trash[index-1].body; 
      // this.messageviewattachment.length=0
      this.messageviewattachment=[]
       for(let i = 0 ; i<this.trash[index-1].attachement.length ;i++){
        this.messageviewattachment.push(this.trash[index-1].attachement[i])
        }
       
       this.lastId=this.trash[index-1].id
     }
   }
 
   toggleEditable(event: any,ID:number) {
     if ( event.target.checked ) {
        this.select=true;
        const index = this.trash.findIndex(item => item.id === ID);
        this.selected.push(this.trash[index])
        console.log(this.selected)
    }
 }


 multipleMails(){
   
   for(var i=0 ; i<this.selected.length;i++){
     if (i==0){
       this.multiMails=this.selected[i].name
     }else{
       this.multiMails=this.multiMails+" , "+this.selected[i].name
     }
   }
   console.log(this.multiMails)
 }


delete(ID:any){
  console.log("welcome from trash delete msg")
  console.log(ID)
    this.http .delete('http://localhost:8080/server/mail/delete',{responseType:'text',
    params:{
     id: this.globals.userID,
     messageID:ID,
     collection:"trash"
   }}).subscribe((s:any) => {
          console.log(s);
          this.trash=[]
          this.getTrash()
       });
   }

Restore(ID:any){
  this.http.get("http://localhost:8080/server/mail/restore",{
    params:{
      userID:this.globals.userID,
      mailID:ID
    }

    }).subscribe(() =>{
     this.trash=[]
      this.getTrash()
  
    })
   }

   Search(){
    var word=  ((document.getElementById("search") as HTMLInputElement).value);
    console.log(word)
   this.http.get("http://localhost:8080/server/mail/search",{responseType:'text',
   params:{
     userID:this.globals.userID,
     folder:"trash",
     searchWord: word
   },observe:'response'
 
   }).subscribe((data:any) =>{
     console.log(data.body)
   
    var jsonstr:string=data.body;
    let jsonArr=JSON.parse(jsonstr)
    this.trash=[]
    for(var i in jsonArr){
 
      this.trash.push(jsonArr[i])
      console.log(this.trash)
    }
   })
   
  }
}
