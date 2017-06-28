import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm, FormControl } from '@angular/forms';

import { PagerService } from './pager.service'

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-books',
  templateUrl: './app//books.component.html',
  styleUrls: [ './app/styles/css/books.component.css' ]
})
export class BooksComponent implements OnInit {
    books:Book[] = [];
    selectedBook:Book;
    dateNow = new Date();
    selectedRegion:number = 2;

    pager: any = {};
    pagedItems: Book[];

    constructor(private router:Router,
                private route: ActivatedRoute,
                private bookService:BookService,
                private pagerService: PagerService) {
    }

    ngOnInit():void {
        this.getBooks();
    }

    getBooks():void {
        this.bookService.getBooks()
            .subscribe((data:Response) => {
                this.books = data.json();
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1) {
            return;
        }
        this.pager = this.pagerService.getPager(this.books.length, page);
        this.pagedItems = this.books.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    /*getBooks():void {
        this.route.params
            .switchMap((params: Params) => this.bookService.getBooksWithPagination(+params['page'] || 1, 5))
            .subscribe((data:Response) => this.books = data.json());
    }*/

    add(form:NgForm) {
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
            }, error => this.bookService.handleError(error));
    }

    delete(book:Book) {
        var confirmation = confirm("Really delete?");
        if (confirmation) {
            this.bookService.deleteBook(book.id)
                .subscribe(() => {
                    this.books = this.books.filter(h => h !== book);
                    this.setPage(this.pager.currentPage);
                    if (this.selectedBook === book) {
                        this.selectedBook = null;
                    }
                }, error => this.bookService.handleError(error));
        }
    }

    filterBooks(filter: NgForm){
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
                this.setPage(1);
            });
    }

    onSelect(book: Book): void {
        this.selectedBook = book;
    }

    gotoDetail(): void {
        this.router.navigate(['/details', this.selectedBook.id]);
    }
}