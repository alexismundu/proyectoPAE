import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Book } from 'src/app/views/book-details/book-details.component.type';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book | null = null;

  constructor(private session: SessionService) {}

  ngOnInit(): void {}

  setCurrentBook(book: Book) {
    this.session.setCurrentBook(book);
  }
}
