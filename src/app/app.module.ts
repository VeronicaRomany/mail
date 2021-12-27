import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { TableComponent } from './table/table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import {HttpClientModule} from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { TrashComponent } from './trash/trash.component';
import { LogOutComponent } from './log-out/log-out.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component'
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NewMailComponent,
    TableComponent,
    FileUploadComponent,
    ContactsComponent,
    DraftComponent,
    LoginComponent,
    RegisterComponent,
    NewFolderComponent,
    TrashComponent,
    LogOutComponent,
    DeleteAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[NewFolderComponent]
})
export class AppModule { }
