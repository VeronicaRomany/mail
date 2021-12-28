import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {HttpClient} from '@angular/common/http'


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
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
   emails: NewMail[]=[];
 messageviewsender:String=""
 messageviewsubject:String=""
 messageviewmail:String=""
 lastId:number | undefined
 multiMails:string=""
 senderFlag:boolean=false;
 subjectFlag:boolean=false;
 priorityFlag:boolean=false;
 isSomethingSelected:boolean=false;
 sortSelector:string="";

  constructor(private http:HttpClient) { 
    this.getinbox()
  }
  
 
  ngOnInit(): void {
  }

  SortBy(){
    this.sortSelector= ((document.getElementById("sort") as HTMLInputElement).value);
    console.log(this.sortSelector)
  }

  filterBy(){
    this.senderFlag=false;
    this.subjectFlag=false;
    this.priorityFlag=false;
    var pr= ((document.getElementById("filter") as HTMLInputElement).value);
    if(pr=="sender"){
      this.senderFlag=true;
    }
     if(pr=="subject"){
      this.subjectFlag=true;
    }
     if(pr=="priority"){
        this.priorityFlag=true;
     }
  }
  /*
    this.emails = [
      {sender:"mark", subject:"OOP", id:"1", mail:"Hello mark"},
      {sender:"vero", subject:"Numerical", id:"2" , mail:"Hello vero"},
      {sender:"tony", subject:"Numerical", id:"3" , mail:"tony cocdos sadxx"},
      {sender:"mariam", subject:"Numerical", id:"4" , mail:"Mariaaaaam hwfs1111111111111111111111111111111111 1111666666666666666666666666666666666666666666655555555555555555 555555555555555555555555555555555555555555555555"}
    ]
*/
    selected:any=[]

  view(ID:any){
    this.lastId=ID
    const index = this.emails.findIndex(item => item.ID === ID);
    this.messageviewsender="From : \t"+this.emails[index].fromEmail;
    this.messageviewsubject="Subject : \t"+this.emails[index].subject;
    this.messageviewmail=this.emails[index].body;
  }
  msg(sender:string){
    console.log(sender)
  }
  viewNext(ID:any){
    const index = this.emails.findIndex(item => item.ID=== ID);
    if(index!=this.emails.length-1){
      this.messageviewsender="From: \t"+this.emails[index+1].fromEmail;
      this.messageviewsubject="Subject: \t"+this.emails[index+1].subject;
      this.messageviewmail=this.emails[index+1].body;
      this.lastId=this.emails[index+1].ID
    }
  }
  viewPrev(ID:any){
    const index = this.emails.findIndex(item => item.ID === ID);
    if(index!=0){
      this.messageviewsender="From: \t"+this.emails[index-1].fromEmail;
      this.messageviewsubject="Subject: \t"+this.emails[index-1].subject;
      this.messageviewmail=this.emails[index-1].body;
      this.lastId=this.emails[index-1].ID
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
    if ( event.target.checked ) {
       this.isSomethingSelected=true;
       const index = this.emails.findIndex(item => item.ID === ID);
       this.selected.push(this.emails[index])
       console.log(this.selected)
   }else{
    
    
    const index = this.emails.findIndex(item => item.ID === ID);
    this.selected.pop(this.emails[index])
    console.log(this.selected)
    if(this.selected.length==0){
      this.isSomethingSelected=false;
    }
   }
  }

  delete(ID:any){
   
    this.emails = []
   

  }

  getinbox(){
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userName:"mark@oop",
      folder:"inbox"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.emails.push(jsonArr[i])
     }
    })
  }
  add(){

  console.log("ana geeeeet")
     // Get a reference to the table
  var tableRef: HTMLTableElement = <HTMLTableElement> document.getElementById('t');

  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0
  let newCell = newRow.insertCell(0);

  // Append a text node to the cell
  let newText = document.createTextNode('newsender');
  newCell.appendChild(newText);
     
  let newCell1 = newRow.insertCell(1);

  // Append a text node to the cell
  let newText1 = document.createTextNode('newsubject');
  newCell1.appendChild(newText1);
  }

}
