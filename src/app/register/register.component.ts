import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
register:any = FormGroup;

 confirm:boolean=false
  constructor(private fb:FormBuilder,private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])]
    })
  }

  registerSubmit(data:any){

  }
gotToLogin(){
  this.router.navigate(['login']);
}

check(){
  const body = ((document.getElementById("newMember") as HTMLInputElement).value);
  this.http.post<boolean>('http://localhost:8080/server/user/register', body).subscribe(data =>{
      var success=data
      console.log(success)
  })
}
}
