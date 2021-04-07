import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../views/home-page/home-page.component.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  currentBook: Book | null = null;
  constructor(private http: HttpClient) {}

  setCurrentBook(book: Book) {
    this.currentBook = book;
  }

  getCurrentBook() {
    return this.currentBook;
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('assets/libros.json');
  }
}
