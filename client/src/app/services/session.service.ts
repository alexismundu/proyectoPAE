import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../views/book-details/book-details.component.type';
import { Movie } from '../views/movie-details/movie-details.component.type';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  currentBook: Book | null = null;
  currentMovie: Movie | null = null;
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

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  getCurrentMovie() {
    return this.currentMovie;
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/peliculas.json');
  }

  signUp(data:any):Promise<any> {
    const url = `${environment.apiUrl}db`;
    return this.http.post(url, data).toPromise();
  }
}
