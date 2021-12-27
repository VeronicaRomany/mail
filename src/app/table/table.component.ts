import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 messageviewname:String=""
 messageviewsubject:String=""
 messageviewmail:String=""
 lastId:string=""
 multiMails:string=""
 senderFlag:boolean=false;
 subjectFlag:boolean=false;
 priorityFlag:boolean=false;
 isSomethingSelected:boolean=false;
 sortSelector:string="";
  constructor() { 
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
    emails = [
      {name:"mark", subject:"OOP", id:"1", mail:"Hello mark"},
      {name:"vero", subject:"Numerical", id:"2" , mail:"Hello vero"},
      {name:"tony", subject:"Numerical", id:"3" , mail:"tony cocdos sadxx"},
      {name:"mariam", subject:"Numerical", id:"4" , mail:"Mariaaaaam hwfs1111111111111111111111111111111111 1111666666666666666666666666666666666666666666655555555555555555 555555555555555555555555555555555555555555555555"}
    ]

    selected:any=[]

  view(ID:any){
    this.lastId=ID
    const index = this.emails.findIndex(item => item.id === ID);
    this.messageviewname="From : \t"+this.emails[index].name;
    this.messageviewsubject="Subject : \t"+this.emails[index].subject;
    this.messageviewmail=this.emails[index].mail;
  }
  msg(name:string){
    console.log(name)
  }
  viewNext(ID:any){
    const index = this.emails.findIndex(item => item.id === ID);
    if(index!=this.emails.length-1){
      this.messageviewname="From: \t"+this.emails[index+1].name;
      this.messageviewsubject="Subject: \t"+this.emails[index+1].subject;
      this.messageviewmail=this.emails[index+1].mail;
      this.lastId=this.emails[index+1].id
    }
  }
  viewPrev(ID:any){
    const index = this.emails.findIndex(item => item.id === ID);
    if(index!=0){
      this.messageviewname="From: \t"+this.emails[index-1].name;
      this.messageviewsubject="Subject: \t"+this.emails[index-1].subject;
      this.messageviewmail=this.emails[index-1].mail;
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

  toggleEditable(event: any,ID:string) {
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

  delete(ID:any){
   
    this.emails = []
   

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
