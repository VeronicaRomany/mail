import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewFolderComponent } from '../new-folder/new-folder.component';
import { TableComponent } from '../table/table.component';
import {HttpClient} from '@angular/common/http'
import { Globals } from 'src/globals';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  f:string=""
  User:string=""
  @ViewChild('newFolder',{read:ViewContainerRef}) Folder !:ViewContainerRef 

  constructor(private resolver :ComponentFactoryResolver ,private http:HttpClient,public globals: Globals) { 
    this.User =this.globals.fromEmail
  }
  

  ngOnInit(): void {
  }
  
  addFolder(){
     var  name= ((document.getElementById("in") as HTMLInputElement).value);
     this.f=name
     console.log(this.f)
     
    let folderFactory = this.resolver.resolveComponentFactory(NewFolderComponent)
    this.Folder.createComponent(folderFactory)
  }
  
  getinbox(){
    console.log("sasasas")
    this.http.get("http://localhost:8080/server/user/getMailFolder",{responseType:'text',
    params:{
      userName:"mark@oop",
      folder:"inbox"
    },observe:'response'

    }).subscribe(data =>{
      
      console.log(data.body)
    })
  }
  
}
