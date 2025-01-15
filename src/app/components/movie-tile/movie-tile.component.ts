import { Component, Input } from '@angular/core';
import { FilmGenre, Genre } from '../../types/Films';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.scss'
})
export class MovieTileComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() title = '';
  @Input() genre: Genre = 'UNKNOWN';
  @Input() imageUrl = '';
  @Input() movieId?: number;
  movieGenre = FilmGenre;
}
