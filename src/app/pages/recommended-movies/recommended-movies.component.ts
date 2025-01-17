import { Component, computed, effect, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { Film } from '../../types/Films';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrl: './recommended-movies.component.scss'
})
export class RecommendedMoviesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription;
  movies = signal<Film[]>([]);
  isLoading = signal<boolean>(false);

  constructor(
    private api: ApiService,
  ) {
    effect(() => {
      this.isLoading.set(this.movies().length < 1);
    }, { allowSignalWrites: true })
  }

  ngOnInit() {
    this.fetchMovies();
  }

  async fetchMovies() {
    this.subscription.add(this.api.getMovies().subscribe({
      next: (movies) => this.movies.set(movies.data.content),
      error: (err) => console.error(err),
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
