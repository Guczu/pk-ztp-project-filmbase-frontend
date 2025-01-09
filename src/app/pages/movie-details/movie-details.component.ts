import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  userRating = 0;

  changeUsersRate(rate: number) {
    this.userRating = this.userRating === rate ? 0 : rate;
  }
}
