import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { NewMail } from '../table/table.component';
@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  drafts: NewMail[]=[];
  messageviewname:String=""
 messageviewsubject:String=""
 messageviewmail:String=""
 lastId:number | undefined
  output: any;
  expression: any;
  constructor(private router: Router, private route: ActivatedRoute, private http : HttpClient) {
     this.getdraft()
   }
  
  ngOnInit(): void {
  }
  getdraft(){
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userName:"mark@oop",
      folder:"draft"
    },observe:'response'

    }).subscribe((data:any) =>{
      console.log(data.body)
    
     var jsonstr:string=data.body;
     let jsonArr=JSON.parse(jsonstr)
     console.log(jsonArr)
     for(var i in jsonArr){
       this.drafts.push(jsonArr[i])
     }
    })
  }

  changePr(priority:number){
    switch(priority){
      case 1:
        return "Low"
       
      case 2:
        return "Medium"

      case 3:
        return "High"
      
        case 4:
          return"Urgent"
    }

    return""

  }

    selected:any=[]

  view(ID:any){
    this.lastId=ID
    const index = this.drafts.findIndex(item => item.ID === ID);
    this.messageviewname="From : \t"+this.drafts[index].fromEmail;
    this.messageviewsubject="Subject : \t"+this.drafts[index].subject;
    this.messageviewmail=this.drafts[index].body;
  }
  msg(name:string){
    console.log(name)
  }
  viewNext(ID:any){
    const index = this.drafts.findIndex(item => item.ID === ID);
    if(index!=this.drafts.length-1){
      this.messageviewname="From: \t"+this.drafts[index+1].fromEmail;
      this.messageviewsubject="Subject: \t"+this.drafts[index+1].subject;
      this.messageviewmail=this.drafts[index+1].body;
      this.lastId=this.drafts[index+1].ID
    }
  }
  viewPrev(ID:any){
    const index = this.drafts.findIndex(item => item.ID === ID);
    if(index!=0){
      this.messageviewname="From: \t"+this.drafts[index-1].fromEmail;
      this.messageviewsubject="Subject: \t"+this.drafts[index-1].subject;
      this.messageviewmail=this.drafts[index-1].body;
      this.lastId=this.drafts[index-1].ID
    }
  }

  toggleEditable(event: any,ID:number) {
    if ( event.target.checked ) {
       const index = this.drafts.findIndex(item => item.ID === ID);
       this.selected.push(this.drafts[index])
       console.log(this.selected)
   }
}

  delete(ID:any){
   
    this.drafts = []
   

  }
  goto(pr:string,to:string , subject:string ,mail:string){
   // this.router.navigate(['/NewMail'], { fragment:mail });
   this.router.navigate(['/NewMail'], { state: {importance:pr,reciever:to,head:subject, Mail: mail }})
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
