import { Component, OnInit } from '@angular/core';

export class NewMail {
  constructor() { 
    this.sender= 'to'
    this.subject = 'subject'
    this.text = 'text'
  }
  sender: string;
  subject:string;
  text:string; 
}
@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})

export class NewMailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
