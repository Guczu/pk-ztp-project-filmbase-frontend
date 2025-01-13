import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film, FilmGenre } from '../../types/Films';
import { Rating } from '../../types/Rate';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  private subscription = new Subscription;
  private routeSub = new Subscription;
  private movieId: number | null = null;
  private movieRating = signal<Rating[]>([]);
  movieGenre = FilmGenre;
  movie: Film | null = null;
  userRating = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.movieId = parseInt(params['id'])
    });

    if (this.movieId) {
      this.fetchMovie(this.movieId);
      this.fetchRating(this.movieId);
    }
  }

  private fetchMovie(movieId: number) {
    this.subscription.add(this.api.getMovie(movieId).subscribe({
      next: (movie) => this.movie = movie.data,
      error: (err) => console.error(err),
    }));
  }

  private fetchRating(movieId: number) {
    this.subscription.add(this.api.getMovieRate(movieId).subscribe({
      next: (rating) => {
        this.movieRating.set(rating.data.content);
        this.userRating = rating.data.content[0]?.grade || 0;
      },
      error: (err) => console.error(err),
    }));
  }

  private rateMovie(grade: number) {
    const movieId = this.movieId;
    if (!movieId) return;

    this.subscription.add(this.api.addMovieRate(movieId, grade).subscribe({
      next: (rating) => {
        this.userRating = rating.data.grade;
        this.fetchRating(movieId);
      },
      error: (err) => console.error(err),
    }));
  }

  private deleteMovieRate() {
    const rateId = this.movieRating()[0]?.id;
    const movieId = this.movieId;

    if (!rateId || !movieId) return;

    this.subscription.add(this.api.deleteMovieRate(rateId).subscribe({
      next: () => {
        this.userRating = 0;
        this.fetchRating(movieId);
      },
      error: (err) => console.error(err),
    }));
  }

  changeUsersRate(rate: number) {
    if (!this.movieId) return;

    if (this.userRating === rate) {
      this.deleteMovieRate();
      this.userRating = 0;
    } else {
      this.deleteMovieRate();
      this.rateMovie(rate);
      this.userRating = rate;
    }

    this.fetchRating(this.movieId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
