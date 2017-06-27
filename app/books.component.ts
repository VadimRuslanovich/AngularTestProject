import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from './book';
import { BookService } from './book.service';
import { Response } from "@angular/http";

@Component({
  selector: 'my-books',
  templateUrl: './app//books.component.html',
  styleUrls: [ './app/books.component.css' ]
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book;

  constructor(
    private router: Router,
    private bookService: BookService) { }

  getBooks(): void {
    this.bookService.getBooks().subscribe((data: Response) => {this.books=data.json()});
  }

  ngOnInit(): void {
    this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }
}
