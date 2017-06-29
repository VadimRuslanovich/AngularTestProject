import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }    from './../components/home.component';
import { BooksComponent }      from './../components/books.component';
import { BookDetailsComponent }      from './../components/book-details.component';
import { AddBookComponent }         from './../components/book-add.component';

const routes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'details/:id',     component: BookDetailsComponent },
  { path: 'books',     component: BooksComponent },
  { path: 'books/:page',     component: BooksComponent },
  { path: 'filter/:title/:author/:date/:page',     component: BooksComponent },
  { path: 'add-new-book',     component: AddBookComponent }
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}