import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/globals';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor( private router: Router,private http:HttpClient,public globals: Globals) {
    const body = this.globals.userID
  this.http.post('http://localhost:8080/server/user/logout',body).subscribe(() =>{
  console.log("logged Out")
  this.router.navigate(['login']); 
});
  }
  ngOnInit(): void {}
  

  

}
