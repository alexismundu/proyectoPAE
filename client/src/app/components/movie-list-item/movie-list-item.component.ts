import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Movie } from 'src/app/views/movie-details/movie-details.component.type';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: Movie | null = null;

  constructor(private session:SessionService) { }

  ngOnInit(): void {
  }

  setCurrentMovie(movie: Movie) {
    this.session.setCurrentMovie(movie);
  }
}
