import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Book }        from './book';
import { BookService } from './book.service';

@Component({
    selector: 'book-details',
    templateUrl: './app/book-details.component.html',
    styleUrls: ['./app/styles/css/book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
    book: Book;
    dateNow = new Date();

    constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.bookService.getBook(+params['id']))
            .subscribe(book => {
                var ololo = book.json();
                this.book = book.json();
            });
    }

    save() {
        this.bookService.updateBook(this.book);
        this.goBack();
    }

    goBack() {
        this.location.back();
    }
}