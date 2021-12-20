import { Component, OnInit } from '@angular/core';

class NewMail {
  sender!: string;
  subject!:string;
  text!:string; 
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
