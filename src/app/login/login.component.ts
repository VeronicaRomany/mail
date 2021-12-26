import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login:any = FormGroup;
  constructor(private fb: FormBuilder , private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.login= this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required]
    })
  }
  loginSubmit(data:any){
    const body = ((document.getElementById("mail") as HTMLInputElement).value);
    this.http.post('http://localhost:8080/server/user/login',body,{responseType:'text'}).subscribe(response =>{
      console.log(response)
  });
     
       this.router.navigate(['table']);
     
  }
  gotToSignup(){
    this.router.navigate(['register']);
  }

}
