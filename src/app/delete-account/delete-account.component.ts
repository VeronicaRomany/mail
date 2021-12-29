import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/globals';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor( private router: Router,private http:HttpClient,public globals: Globals) {
    // request delete ll account by id
    const body = this.globals.fromEmail
    this.http.post('http://localhost:8080/server/user/delete',body).subscribe(() =>{
    console.log("Delete Acc ")
    this.router.navigate(['login']); 
  });
   }

  ngOnInit(): void {
  }

}
