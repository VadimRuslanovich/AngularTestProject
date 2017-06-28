import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }    from './home.component';
import { BooksComponent }      from './books.component';
import { BookDetailsComponent }      from './book-details.component';

const routes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'details/:id',     component: BookDetailsComponent },
  { path: 'books',     component: BooksComponent },
  { path: 'books/:page',     component: BooksComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}