import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Film, Pagination } from '../../types/Films';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss'
})
export class MovieCatalogComponent implements OnInit, OnDestroy {
  private subscription = new Subscription;
  movies = signal<Film[]>([]);
  pagination = signal<Pagination>({
    number: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0,
  });

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    const paginationParams = new HttpParams()
      .set('page-number', this.pagination().number.toString())
      .set('page-size', this.pagination().size.toString())
      .set('sort-direction', 'ASC');

    this.subscription.add(this.api.getMovies(paginationParams).subscribe({
      next: (movies) => {
        this.movies.set(movies.data.content);
        this.pagination.set(movies.data.page);
      },
      error: (err) => console.error(err),
    }));
  }

  nextPaginationPage() {
    this.pagination.update(p => ({ ...p, number: p.number + 1 }));
    this.fetchMovies();
  }

  previousPaginationPage() {
    if (this.pagination().number > 0) {
      this.pagination.update(p => ({ ...p, number: p.number - 1 }))
      this.fetchMovies();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
