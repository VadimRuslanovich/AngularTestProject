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
    totalItems: number;

    constructor(private router:Router,
                private route: ActivatedRoute,
                private bookService:BookService,
                private pagerService: PagerService) {
    }

    ngOnInit():void {
        this.getBooks();
    }

    getAllBooks():void {
        this.bookService.getBooks()
            .subscribe((data:Response) => {
                this.books = data.json();
                this.setPage(1);
            },
                error => this.error = this.bookService.handleError(error));
    }

    getBooks():void {
        this.route.params
            .switchMap((params:Params) => this.bookService.sliceBooks((+params['page'] || 1)*pageSize-pageSize, pageSize))
            .subscribe((data:Response) => {
                    this.books = data.json();
                    this.totalItems = +data.headers.get('x-total-count');
                    this.books.length > 0 ? this.setPage(1) : this.setPage(0);
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

    add(form:NgForm): void {
        let book = new Book(form.controls['title'].value, form.controls['author'].value, form.controls['date'].value,
            form.controls['description'].value, form.controls['issued'].value,
            form.controls.hasOwnProperty('region_one') ? form.controls['region_one'].value
                : form.controls.hasOwnProperty('region_two_1') && form.controls.hasOwnProperty('region_two_2')
                ? (`${form.controls['region_two_1'].value} ${form.controls['region_two_2'].value}`) : "");
        this.bookService.createBook(book)
            .subscribe(res => {
                this.books.push(res.json() as Book);
                this.selectedBook = null;
                this.setPage(this.pager.currentPage);
            }, error => this.error = this.bookService.handleError(error));
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

    filterBooks(filter: NgForm): void {
        let properties: string[] = [], values: string[] = [];
        Object.keys(filter.controls).forEach(key => {
            if(filter.controls[key].value != null && filter.controls[key].value != '') {
                values.push(filter.controls[key].value);
                properties.push(key);
            }
        });
        this.bookService.filterBooks(properties, values)
            .subscribe((data:Response) => {
                this.books = data.json();
                this.totalItems = +data.headers.get('x-total-count');
                this.setPage(1);
            },
                error => this.error = this.bookService.handleError(error));
    }

    onSelect(book: Book): void {
        this.selectedBook = book;
    }

    gotoDetail(): void {
        this.router.navigate(['/details', this.selectedBook.id]);
    }
}