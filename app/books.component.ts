import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm } from '@angular/forms';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-books',
  templateUrl: './app//books.component.html',
  styleUrls: [ './app/books.component.css' ]
})
export class BooksComponent implements OnInit {
    books: Book[] = [];
    selectedBook: Book;
    dateNow = new Date();
    selectedRegion: number = 2;

    constructor(private router: Router,
                private bookService: BookService) {
    }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
        this.bookService.getBooks().subscribe((data: Response) => this.books = data.json());
    }

    add(form: NgForm) {
        let book = new Book(form.controls['title'].value, form.controls['author'].value, form.controls['date'].value,
            form.controls['descrption'].value, form.controls['issued'].value,
            form.controls.hasOwnProperty('region_one') ? form.controls['region_one'].value :
                form.controls['region_two_1'].value + form.controls['region_two_2'].value);
        this.bookService.createBook(book)
            .subscribe(res => {
                this.books.push(res.json() as Book);
                this.selectedBook = null;
            }, error => this.bookService.handleError(error));
    }

    /*add(book: Book) {
     this.bookService.createBook(book);
     this.books.push(book);
     this.selectedBook = null;
     }*/

    delete(book: Book) {
        this.bookService.deleteBook(book.id)
            .subscribe(() => {
                this.books = this.books.filter(h => h !== book);
                if (this.selectedBook === book) {
                    this.selectedBook = null;
                }
            }, error => this.bookService.handleError(error));
    }

    onSelect(book: Book): void {
        this.selectedBook = book;
    }

    gotoDetail(): void {
        this.router.navigate(['/details', this.selectedBook.id]);
    }
}