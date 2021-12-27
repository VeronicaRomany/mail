import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
  baseApiUrl = "https://file.io"
    
  constructor(private http:HttpClient) { }
 
  // Returns an observable
  upload(file :any):Observable<any> {
  
      
       
       const formData = new FormData(); 
       formData.append("file", file, file.name);

    //  for(var i=0;i<file.length;i++){
     //   formData.append("file[]",file[i])
     // }


      console.log(formData) 

      // Store form name as "file" with file data
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl, formData)
  }
}