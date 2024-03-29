import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/globals';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
login:any = FormGroup;
check:string=""
  constructor(private fb: FormBuilder , private router: Router,private http:HttpClient,public globals: Globals) { }

  ngOnInit(): void {
    this.login= this.fb.group({
     
      email:['',Validators.required]
    })
  }

  loginSubmit(data:any){
   if (((document.getElementById("mail") as HTMLInputElement).value)==""){
       this.check="please enter the email"
   }
   else{
    this.globals.fromEmail= ((document.getElementById("mail") as HTMLInputElement).value);
   
    console.log(this.globals.fromEmail)

    const body = ((document.getElementById("mail") as HTMLInputElement).value);

    this.http.post('http://localhost:8080/server/user/login',body,{responseType:'text'}).subscribe(response =>{
      console.log(response)
    if(response!="0"){
      this.globals.userID=response
      console.log(this.globals.userID)
      this.router.navigate(['table'],{  fragment:this.globals.userID});  
    } 
    else{
    this.check="Sorry, we don't recognize this email." ;
    (document.getElementById("mail") as HTMLInputElement).value="";
    }   
  });
}
       
  }


  gotToSignup(){
    this.router.navigate(['register']);
  }

}
