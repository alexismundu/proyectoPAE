import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/views/home-page/home-page.component.type';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book | null = null;

  constructor() {}

  ngOnInit(): void {}
}
