import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppComponent }         from './app.component';
import { BooksComponent }      from './books.component';
import { BookDetailsComponent }      from './book-details.component';
import { BookService }          from './book.service';

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
        BooksComponent,
        BookDetailsComponent
    ],
    providers: [BookService],
    bootstrap: [AppComponent]
})

export class AppModule { }