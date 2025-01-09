import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss'
})
export class MovieCatalogComponent {
  page = 1;

  nextPaginationPage() {
    this.page++;
  }

  previousPaginationPage() {
    this.page > 1 ? this.page-- : this.page;
  }
}
