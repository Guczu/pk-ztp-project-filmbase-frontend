import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Film } from '../../types/Films';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription = new Subscription;
  movies = signal<Film[]>([]);

  constructor(
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.fetchMovies();
  }

  async fetchMovies() {
    this.subscription.add(this.api.getMovies().subscribe({
      next: (movies) => this.movies.set(movies.data.content),
      error: (err) => console.error(err),
    }));

    // this.subscription.add(this.api.getMovie(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.api.register('gochu2', '1234567').subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // });

    this.subscription.add(this.api.login('gochu2', '1234567').subscribe({
      next: (auth) => {
        console.log('login',auth.data.accessToken);
        localStorage.setItem('authToken', auth.data.accessToken);
      },
      error: (err) => console.error(err),
    }));
    
    setTimeout(()=>{},1000)

    // this.subscription.add(this.api.addMovieComment('test_comment', 4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.addMovieRate(4, 5).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.getComments(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.deleteComment(2).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.getComments(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.getMovieRateCount(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.getMovieRateAverage(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));

    // this.subscription.add(this.api.getMovieRate(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));
    
    // this.subscription.add(this.api.deleteMovieRate(4).subscribe({
    //   next: (movie) => console.log(movie.data),
    //   error: (err) => console.error(err),
    // }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
