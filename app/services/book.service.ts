import { Book } from './../book';

import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const apiUrl = "http://localhost:3000/books";

@Injectable()
export class BookService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getBooks(): Observable<Response> {
    return this.http.get(apiUrl);
  }

  getBooksWithPagination(page: number = 1, limit: number = 5): Observable<Response> {
    return this.http.get(`${apiUrl}?_page=${page}&_limit=${limit}`);
  }

  getBook(id: number): Observable<Response> {
    return this.http.get(`${apiUrl}/${id}`);
  }

  createBook(book: Book): Observable<Response> {
    return this.http.post(apiUrl, JSON.stringify(book), {headers: this.headers});
  }

  updateBook(book: Book) {
    return this.http.put(`${apiUrl}/${book.id}`, JSON.stringify(book), {headers: this.headers})
        .subscribe(() => book, error => this.handleError(error));
  }

  deleteBook(id: number): Observable<Response> {
    return this.http.delete(`${apiUrl}/${id}`, {headers: this.headers});
  }

  sliceBooks(start: number = 0, limit: number = 3): Observable<Response>{
    return this.http.get(`${apiUrl}?_start=${start}&_limit=${limit}`);
  }

  filterBooks(properties: string[], values: string[], start: number = 0, limit: number = 3): Observable<Response> {
    var url;
    if (properties.length > 0) {
      url = `${apiUrl}?`;
      for (let i = 0; i < properties.length; i++) {
        url += properties[i] + "=" + values[i];
        (i + 1) != properties.length ? url += "&" : null;
      }
      url = `${url}&_start=${start}&_limit=${limit}`
      return this.http.get(url);
    }

    url = `${apiUrl}?_start=${start}&_limit=${limit}`;
    return this.http.get(url);
  }

  handleError(error: any) {
    console.error('An error occurred', error);
    return error.status || error.statusText;
  }
}