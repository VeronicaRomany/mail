import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { TableComponent } from './table/table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavigationBarComponent,
    NewMailComponent,
    TableComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
