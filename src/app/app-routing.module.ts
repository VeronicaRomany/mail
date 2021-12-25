import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewMailComponent } from './new-mail/new-mail.component';
import { TableComponent } from './table/table.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';

const routes: Routes = [
  { path: 'NewMail', component: NewMailComponent },
  { path: 'table', component: TableComponent },
  { path: 'Contacts',component: ContactsComponent},
  { path: 'Draft',component: DraftComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
