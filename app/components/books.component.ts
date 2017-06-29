import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm, FormControl } from '@angular/forms';

import { PagerService } from './../services/pager.service'

import { Book } from './../book';
import { BookService } from './../services/book.service';

const pageSize = 3;

@Component({
  selector: 'my-books',
  templateUrl: './app/views/books.component.html',
  styleUrls: [ './app/styles/css/books.component.css' ]
})
export class BooksComponent implements OnInit {
    books:Book[] = [];
    selectedBook:Book;
    dateNow = new Date();

    error: string = "";

    pager: any = {};
    currentPage: number = 1;
    totalItems: number;

    tempChecker: string = "all";

    constructor(private router:Router,
                private route: ActivatedRoute,
                private bookService:BookService,
                private pagerService: PagerService) {
    }

    ngOnInit():void {
        this.getBooks();
    }

    check(params:Params) {
        if (params["title"] || params["author"] || params["date"]) {
            this.currentPage = +params["page"];
            return this.filterBooks({
                    title: params["title"] || "",
                    author: params["author"] || "",
                    date: params["date"] || ""
                },
                (+params["page"] || 1) * pageSize - pageSize,
                pageSize);
        } else {
            this.currentPage = +params["page"];
            return this.bookService.sliceBooks((+params["page"] || 1) * pageSize - pageSize, pageSize);
        }
    }

    getBooks():void {
        this.route.params
            .switchMap((params:Params) => this.check(params))
            .subscribe((data:Response) => {
                    this.books = data.json();
                    this.totalItems = +data.headers.get('x-total-count');
                    this.books.length > 0 ? this.setPage(this.currentPage) : this.setPage(0);
                },
                error => this.error = this.bookService.handleError(error));

    }
    
    setPage(page: number = 1): void {
        if (page < 1) {
            return;
        }
        this.pager = this.pagerService.getPager(this.totalItems, page);
        if(this.books.length <= 0) {
            this.error = "Nothing found";
            return;
        }
        this.error = "";
    }

    delete(book:Book): void {
        var confirmation = confirm("Really delete?");
        if (confirmation) {
            this.bookService.deleteBook(book.id)
                .subscribe(() => {
                    this.books = this.books.filter(h => h !== book);
                    this.setPage(this.pager.currentPage);
                    if (this.selectedBook === book) {
                        this.selectedBook = null;
                    }
                }, error => this.error = this.bookService.handleError(error));
        }
    }

    filterBooks(filter: any, start: number, limit: number) {
        let properties:string[] = [], values:string[] = [];
        if (filter.title != null && filter.title != "" && filter.title != this.tempChecker) {
            properties.push("title");
            values.push(filter.title);
        }
        if (filter.author != null && filter.author != "" && filter.author != this.tempChecker) {
            properties.push("author");
            values.push(filter.author);
        }
        if (filter.date != null && filter.date != "" && filter.date != this.tempChecker) {
            properties.push("date");
            values.push(filter.date);
        }
    
        return this.bookService.filterBooks(properties, values, start, limit);
    }

    onSelect(book: Book): void {
        this.selectedBook = book;
    }

    gotoDetail(): void {
        this.router.navigate(['details', this.selectedBook.id]);
    }
}