import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewMailComponent } from './new-mail/new-mail.component';



const routes: Routes = [
  { path: 'NewMail', component: NewMailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
