import { Component, input, output } from '@angular/core';
import { Film } from '../../types/Films';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrl: './recommended-movies.component.scss'
})
export class RecommendedMoviesComponent {
  movies = input<Film[]>();
  moviesChange = output<Film[]>();
}
