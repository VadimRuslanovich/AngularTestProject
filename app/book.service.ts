import { Book } from './book';

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  books: Book[] = [];

  apiUrl: string = " http://localhost:3000/";

  constructor(private http: Http){}

  getBooks() {
    return this.http.get(this.apiUrl + "books");
  }

  getBook(id: number) {
    return this.http.get(this.apiUrl + `books/${id}`);
  }
}
