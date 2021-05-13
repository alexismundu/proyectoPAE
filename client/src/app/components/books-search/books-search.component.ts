import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Book } from 'src/app/views/book-details/book-details.component.type';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent implements OnInit {
  // @Input() books: Book[] | [] = [];
  bookKeyword: string | null;
  books: Book[] | null;

  constructor(private session: SessionService, private route:ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.bookKeyword = routeParams.get('keyword'); 
    this.session.searchBooks(this.bookKeyword).subscribe({
      next: this.handleGetBooks.bind(this),
      error: this.handleGetBooksError,
    })
  }

  ngOnInit(): void {

  }

  setCurrentBook(book: Book) {
    this.session.setCurrentBook(book);
  }

  handleGetBooks(data: any) {
    this.books = data.length > 10 ? data.slice(0, 10) : data;
  }

  handleGetBooksError(e: string) {
    console.log('BookDetails error: ', e);
  }

}
