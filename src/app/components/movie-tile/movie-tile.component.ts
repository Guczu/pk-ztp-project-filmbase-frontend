import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.scss'
})
export class MovieTileComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() title = '';
  @Input() genre = '';
  @Input() imageUrl = '';
  @Input() movieId?: number;
}
