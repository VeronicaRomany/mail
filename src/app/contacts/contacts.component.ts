import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  messageviewname:String=""
 messageviewsubject:String=""
 messageviewmail:String=""
 lastId:string=""
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  Contacts = [
    {name:"Mark Ehab", Mail:"mark1@oop.com"},
  ]


msg(mail:string){
  
  this.router.navigate(['/NewMail'], { fragment:mail });
}


}
