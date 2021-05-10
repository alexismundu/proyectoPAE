import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

import { Book } from 'src/app/views/book-details/book-details.component.type';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null;
  bookIdFromRoute: string | null;

  constructor(private route: ActivatedRoute, private session: SessionService) {
    const routeParams = this.route.snapshot.paramMap;
    this.bookIdFromRoute = routeParams.get('id');
    const currentBook = this.session.getCurrentBook();
    this.book = currentBook;
    if (this.book === null)
      this.session
        .getBook(this.bookIdFromRoute)
        .subscribe((book) => (this.book = book));
  }

  ngOnInit() {}
}
