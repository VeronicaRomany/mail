import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewFolderComponent } from '../new-folder/new-folder.component';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  f:string=""
 
  @ViewChild('newFolder',{read:ViewContainerRef}) Folder !:ViewContainerRef 

  constructor(private resolver :ComponentFactoryResolver) { 
    
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
}
