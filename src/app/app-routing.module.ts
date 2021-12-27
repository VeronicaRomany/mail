import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewMailComponent } from './new-mail/new-mail.component';
import { TableComponent } from './table/table.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { TrashComponent } from './trash/trash.component';


const routes: Routes = [
  { path: 'NewMail', component: NewMailComponent },
  { path: 'table', component: TableComponent },
  { path: 'Contacts',component: ContactsComponent},
  { path: 'Draft',component: DraftComponent},
  { path: 'login',component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  {path:'',redirectTo :'login' ,pathMatch:"full"},
  {path:'navigation' , component: NavigationBarComponent},
  {path:'createFolder',component:NewFolderComponent},
  {path:'trash',component:TrashComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
