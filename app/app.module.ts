import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppComponent }         from './app.component';
import { HomeComponent }      from './home.component';
import { BooksComponent }      from './books.component';
import { BookDetailsComponent }      from './book-details.component';
import { BookService }          from './book.service';
import { PagerService }    from './pager.service'

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
        BookDetailsComponent
    ],
    providers: [BookService, PagerService],
    bootstrap: [AppComponent]
})

export class AppModule { }