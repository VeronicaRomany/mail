import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewMailComponent } from './new-mail/new-mail.component';
import { TableComponent } from './table/table.component';



const routes: Routes = [
  { path: 'NewMail', component: NewMailComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
