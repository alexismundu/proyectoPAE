import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

import { Movie } from 'src/app/views/movie-details/movie-details.component.type';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null;
  movieIdFromRoute: string | null;

  constructor(private route: ActivatedRoute, private session: SessionService) {
    const routeParams = this.route.snapshot.paramMap;
    this.movieIdFromRoute = routeParams.get('id');
    const currentMovie = this.session.getCurrentMovie();
    this.movie = currentMovie;
    if (this.movie === null)
      this.session
        .getMovie(this.movieIdFromRoute)
        .subscribe((movie) => (this.movie = movie));
  }

  ngOnInit() {}
}
