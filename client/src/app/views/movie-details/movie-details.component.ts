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
  movie: Movie | null = this.session.getCurrentMovie();
  movieIdFromRoute: string | null;

  constructor(private route: ActivatedRoute, private session: SessionService) {
    const routeParams = this.route.snapshot.paramMap;
    this.movieIdFromRoute = routeParams.get('id');
  }

  ngOnInit() {
    console.log('ngInit: ', this.movie);
    if (
      this.movie === null ||
      this.movieIdFromRoute !== this.session.currentMovie?._id
    ) {
      this.session.getMovies().subscribe({
        next: this.handleGetMovies.bind(this),
        error: this.handleGetMoviesError,
      });
    }
  }

  handleGetMovies(response: any) {
    const possibleMovie: Movie | undefined = response.data.find(
      (movie: Movie) => movie._id === this.movieIdFromRoute
    );
    if (possibleMovie) {
      this.movie = possibleMovie;
    }
  }

  handleGetMoviesError(e: string) {
    console.log('MovieDetails error: ', e);
  }
}
