import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppComponent }         from './../components/app.component';
import { HomeComponent }      from './../components/home.component';
import { BooksComponent }      from './../components/books.component';
import { BookDetailsComponent }      from './../components/book-details.component';
import { AddBookComponent }         from './../components/book-add.component';
import { BookService }          from './../services/book.service';
import { PagerService }    from './../services/pager.service'

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        BooksComponent,
        BookDetailsComponent,
        AddBookComponent
    ],
    providers: [BookService, PagerService],
    bootstrap: [AppComponent]
})

export class AppModule { }