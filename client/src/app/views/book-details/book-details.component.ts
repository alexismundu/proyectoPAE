import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

import { Book } from 'src/app/views/home-page/home-page.component.type';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = this.session.getCurrentBook();
  bookIdFromRoute: string | null;

  constructor(private route: ActivatedRoute, private session: SessionService) {
    const routeParams = this.route.snapshot.paramMap;
    this.bookIdFromRoute = routeParams.get('id');
  }

  ngOnInit() {
    console.log('ngInit: ', this.book);
    if (
      this.book === null ||
      this.bookIdFromRoute !== this.session.currentBook?._id
    ) {
      this.session.getBooks().subscribe({
        next: this.handleGetBooks.bind(this),
        error: this.handleGetBooksError,
      });
    }
  }

  handleGetBooks(response: any) {
    const possibleBook: Book | undefined = response.data.find(
      (book: Book) => book._id === this.bookIdFromRoute
    );
    if (possibleBook) {
      this.book = possibleBook;
    }
  }

  handleGetBooksError(e: string) {
    console.log('BookDetails error: ', e);
  }
}
