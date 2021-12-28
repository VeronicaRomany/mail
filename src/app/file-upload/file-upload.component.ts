import { isNull, nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit ,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { empty } from 'rxjs';
import { FileUploadService } from './file-upload.service';
  
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent  {  
    shortLink: string = "";
    flag :boolean=false
    // Variable to store shortLink from api response
    
    loading: boolean = false; // Flag variable
    file: FileList = {} as FileList; // Variable to store file
  //file:string[]=[]
    attachments:string[]=[]
    
    // Inject service 
    constructor(private fileUploadService: FileUploadService) { }
  
    @Output() public link = new EventEmitter();
    
    
    // On file Select
    onChange(event:any){
        this.flag=true
       this.file = event.target.files[0];
    
       //for(var i=0 ; i<event.target.files.length ;i++){
       // this.file.push(event.target.files[i]);
       //}
    } 
    deleteAttach(event:any){
        this.attachments=[]
        this.shortLink = ""; 
        this.flag=false;
       
        
        

    }
  
    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    this.shortLink = event.link;
                    this.link.emit(event.link) 
                    this.attachments.push(event.link)
                    console.log(this.attachments)
                    this.loading = false; // Flag variable 
                  
                }
            }
        );
        
    }
}
