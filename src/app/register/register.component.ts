import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/globals';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
register:any = FormGroup;
check:string=""
  constructor(private fb:FormBuilder,private router: Router,private http:HttpClient,public globals: Globals) { }

  ngOnInit(): void {
    this.register = this.fb.group({
     
     email:['',Validators.compose([Validators.required,Validators.email])]
    })
  }

  registerSubmit(data:any){
    var body = ((document.getElementById("newMember") as HTMLInputElement).value);
    var emailCheckRegex=/^[a-zA-Z\d]+@oop$/gm
    var flag:boolean=emailCheckRegex.test(body)
    if(!flag){
      (document.getElementById("newMember") as HTMLInputElement).value=''
     this.check="wrong format"
    }
    else{

    this.http.post<boolean>('http://localhost:8080/server/user/register', body).subscribe(next =>{
      console.log(next)
      if(next){
        this.http.post('http://localhost:8080/server/user/login',body,{responseType:'text'}).subscribe(response =>{
          console.log(response)
        if(response!="0"){
          this.globals.userID=response
          this.globals.fromEmail=body
          console.log(this.globals.userID)
          console.log(this.globals.fromEmail)
          this.router.navigate(['table'],{  fragment:this.globals.userID});  
        }  
    });
  }
});}
  }

gotToLogin(){
  this.router.navigate(['login']);
}


}
