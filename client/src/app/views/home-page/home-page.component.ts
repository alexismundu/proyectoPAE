import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

import { Book } from './home-page.component.type';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  books: Book[] | [] = [];
  constructor(private session: SessionService) {
    this.session.getBooks().subscribe({
      next: this.handleGetBooks.bind(this),
      error: this.handleGetBooksError,
    });
  }

  ngOnInit(): void {}

  handleGetBooks(response: any) {
    this.books = response.data;
  }

  handleGetBooksError(e: string) {
    console.log('BookDetails error: ', e);
  }
}
