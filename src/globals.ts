import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  userID: string = "";
  fromEmail:string=""
  setUserID(user:string){
      this.userID=user
  }
  getUserID(){
    return this.userID
}
setmail(Mail:string){
    this.fromEmail=Mail
}
getmail(){
  return this.fromEmail
}
}