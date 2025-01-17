import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film, FilmGenre } from '../../types/Films';
import { Rating } from '../../types/Rate';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  private subscription = new Subscription;
  private routeSub = new Subscription;
  private movieId: number | null = null;
  private movieRating = signal<Rating | null>(null);
  
  overallRate: number = 0;
  overallCount: number = 0;
  movieGenre = FilmGenre;
  movie: Film | null = null;
  userRating = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.movieId = parseInt(params['id'])
    });

    if (this.movieId) {
      this.fetchMovie(this.movieId);
      this.fetchOverallRating(this.movieId);
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
    if (!this.auth.isLoggedIn()) return;

    this.subscription.add(this.api.getUserMovieRate(movieId).subscribe({
      next: (rating) => {
        this.movieRating.set(rating.data);
        this.userRating = rating.data?.grade || 0;
      },
      error: (err) => console.error(err),
    }));
  }

  private fetchOverallRating(movieId: number) {
    this.subscription.add(this.api.getMovieRateAverage(movieId).subscribe({
      next: (rating) => {
        this.overallRate = Math.floor(rating.data * 100) / 100;
      },
      error: (err) => console.error(err),
    }));

    this.subscription.add(this.api.getMovieRateCount(movieId).subscribe({
      next: (count) => {
        this.overallCount = count.data;
      },
      error: (err) => console.error(err),
    }))
  }

  private rateMovie(grade: number) {
    const movieId = this.movieId;
    if (!movieId) return;

    this.subscription.add(this.api.addMovieRate(movieId, grade).subscribe({
      next: (rating) => {
        this.userRating = rating.data.grade;
        this.fetchRating(movieId);
        this.fetchOverallRating(movieId);
      },
      error: (err) => console.error(err),
    }));
  }

  private updateUserRate(grade: number) {
    const movieId = this.movieId;
    const userRate = this.movieRating()?.id;
    if (!movieId || !userRate) return;

    this.subscription.add(this.api.updateMovieRate(movieId, userRate, grade).subscribe({
      next: () => {
        this.userRating = grade
        this.fetchOverallRating(movieId);
      },
      error: (err) => console.error(err),
    }));
  }

  private deleteMovieRate() {
    const userRate = this.movieRating();

    if (!userRate) return;
    
    const rateId = userRate.id;
    const movieId = this.movieId;

    if (!rateId || !movieId) return;

    this.subscription.add(this.api.deleteMovieRate(rateId).subscribe({
      next: () => {
        this.userRating = 0;
        this.fetchRating(movieId);
        this.fetchOverallRating(movieId);
      },
      error: (err) => console.error(err),
    }));
  }

  changeUsersRate(rate: number) {
    if (!this.movieId) return;

    if (this.userRating === rate) {
      this.deleteMovieRate();
      return;
    }

    if (this.userRating) {
      this.updateUserRate(rate);
      return;
    } 
      
    this.rateMovie(rate);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
