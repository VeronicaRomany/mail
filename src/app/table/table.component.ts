import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 messageview:String=""
 lastId:string=""
  constructor() { }
  
  ngOnInit(): void {
  }
    emails = [
      {name:"mark", subject:"OOP", id:"1", mail:"Hello mark"},
      {name:"vero", subject:"Numerical", id:"2" , mail:"Hello vero"},
      {name:"tony", subject:"Numerical", id:"3" , mail:"tony cocdos sadxx"},
      {name:"mariam", subject:"Numerical", id:"4" , mail:"Mariaaaaam hwfs;ahf'a"}
    ]

  view(ID:any){
    this.lastId=ID
    const index = this.emails.findIndex(item => item.id === ID);
    this.messageview=this.emails[index].mail;
  }
  viewNext(ID:any){
    const index = this.emails.findIndex(item => item.id === ID);
    if(index!=this.emails.length-1){
      this.messageview=this.emails[index+1].mail;
      this.lastId=this.emails[index+1].id
    }
  }
  delete(ID:any){
   //const index = this.emails.findIndex(item => item.id === ID);
   //this.emails.splice(index,1)
  
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
