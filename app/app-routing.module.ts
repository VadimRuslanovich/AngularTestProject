import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent }      from './books.component';
import { BookDetailsComponent }      from './book-details.component';

const routes: Routes = [
  { path: 'details/:id',     component: BookDetailsComponent },
  { path: '**',     component: BooksComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}