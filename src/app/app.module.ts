import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewMailComponent } from './new-mail/new-mail.component';





@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavigationBarComponent,
    NewMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
