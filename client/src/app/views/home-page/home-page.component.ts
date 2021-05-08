import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

import { Book } from '../book-details/book-details.component.type';
import { Movie } from '../movie-details/movie-details.component.type';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  books: Book[] | [] = [];
  movies: Movie[] | [] = [];
  constructor(private session: SessionService) {
    this.session.getBooks().subscribe({
      next: this.handleGetBooks.bind(this),
      error: this.handleGetBooksError,
    });
    this.session.getMovies().subscribe({
      next: this.handleGetMovies.bind(this),
      error: this.handleGetMoviesError,
    });
  }

  ngOnInit(): void {}

  handleGetBooks(data: any) {
    this.books = data.length > 10 ? data.slice(0, 10) : data;
  }

  handleGetBooksError(e: string) {
    console.log('BookDetails error: ', e);
  }

  handleGetMovies(data: any) {
    this.movies = data.length > 10 ? data.slice(0, 10) : data;
  }

  handleGetMoviesError(e: string) {
    console.log('MovieDetails error: ', e);
  }
}
