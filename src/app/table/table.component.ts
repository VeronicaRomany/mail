import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  add(tableID: string){
  console.log("ana geeeeet")
     // Get a reference to the table
  var tableRef: HTMLTableElement = <HTMLTableElement> document.getElementById(tableID);

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
  newCell1.appendChild(newText);
  }

}
