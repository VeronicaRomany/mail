import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewMail } from '../table/table.component';

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
  lastId:number | undefined
  multiMails:string=""
  select :boolean=false;
   constructor(private http : HttpClient) {
      this.getTrash();
    }
   
   ngOnInit(): void {
   }
   getTrash(){
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userName:"mark@oop",
      folder:"trash"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.trash.push(jsonArr[i])
     }
    })
  }
    
 
     selected:any=[]
     
   view(ID:any){
     this.lastId=ID
     const index = this.trash.findIndex(item => item.id === ID);
     this.messageviewname="From : \t"+this.trash[index].fromEmail;
     this.messageviewsubject="Subject : \t"+this.trash[index].subject;
     this.messageviewmail=this.trash[index].body;
   }
   msg(name:string){
     console.log(name)
   }
   viewNext(ID:any){
     const index = this.trash.findIndex(item => item.id === ID);
     if(index!=this.trash.length-1){
       this.messageviewname="From: \t"+this.trash[index+1].fromEmail;
       this.messageviewsubject="Subject: \t"+this.trash[index+1].subject;
       this.messageviewmail=this.trash[index+1].body;
       this.lastId=this.trash[index+1].id
     }
   }
   viewPrev(ID:any){
     const index = this.trash.findIndex(item => item.id === ID);
     if(index!=0){
       this.messageviewname="From: \t"+this.trash[index-1].fromEmail;
       this.messageviewsubject="Subject: \t"+this.trash[index-1].subject;
       this.messageviewmail=this.trash[index-1].body;
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
    
     this.trash = []
    
 
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
