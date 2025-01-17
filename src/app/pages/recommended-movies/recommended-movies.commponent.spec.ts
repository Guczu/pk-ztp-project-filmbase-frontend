import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendedMoviesComponent } from './recommended-movies.component';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';
import { Film } from '../../types/Films';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecommendedMoviesComponent', () => {
  let component: RecommendedMoviesComponent;
  let fixture: ComponentFixture<RecommendedMoviesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [RecommendedMoviesComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with movies fetched from API', () => {
    const mockMovies: Film[] = [
      { id: 1, title: 'Movie 1', genre: 'ACTION', imageUrl: 'url1', director: 'test', description: 'test', releaseDate: '123' },
      { id: 2, title: 'Movie 2', genre: 'DRAMA', imageUrl: 'url2', director: 'test', description: 'test', releaseDate: '123' },
    ];

    mockApiService.getMovies.and.returnValue(of({ message: '123', data: { content: mockMovies, page: { size: 5, number: 0, totalElements: 5, totalPages: 1  } } }));

    component.ngOnInit();

    expect(mockApiService.getMovies).toHaveBeenCalled();
    expect(component.movies()).toEqual(mockMovies);
    expect(component.isLoading()).toBe(false);
  });

  it('should handle errors when fetching movies', () => {
    const consoleSpy = spyOn(console, 'error');
    mockApiService.getMovies.and.returnValue(throwError(() => new Error('API error')));

    component.ngOnInit();

    expect(mockApiService.getMovies).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API error'));
    expect(component.movies()).toEqual([]);
  });

  it('should unsubscribe on destroy', () => {
    const subscriptionSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
