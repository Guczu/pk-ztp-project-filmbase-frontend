import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../types/Films';
import { ApiResponse, PagedApiResponse, PaginationParams } from '../types/General';
import { Auth } from '../types/Auth';
import { Rating } from '../types/Rate';

const authToken = localStorage.getItem('authToken');
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  login(username: string, password: string): Observable<ApiResponse<Auth>> {
    return this.http.post<ApiResponse<Auth>>(`/api/auth/login`, { username, password })
  }

  register(username: string, password: string): Observable<PagedApiResponse<Auth>> {
    return this.http.post<PagedApiResponse<Auth>>(`/api/auth/register`, { username, password })
  }

  authtoken(userId: number, accessToken: string, refreshToken: string): Observable<PagedApiResponse<Auth>> {
    return this.http.post<PagedApiResponse<Auth>>(`/api/auth/token`, { userId, accessToken, refreshToken })
  }

  getMovies(paginationParams?: HttpParams): Observable<PagedApiResponse<Film[]>> {
    return this.http.get<PagedApiResponse<Film[]>>(`/api/films`, { params: paginationParams });
  }

  getMovie(filmId: number): Observable<ApiResponse<Film>> {
    return this.http.get<ApiResponse<Film>>(`/api/films/film/${filmId}`);
  }

  addMovieComment(comment: string, filmId: number): Observable<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(`/api/comments/comment`, { comment, filmId }, { headers });
  }

  getComments(filmId: number): Observable<PagedApiResponse<Comment[]>> {
    return this.http.get<PagedApiResponse<Comment[]>>(`/api/comments/film/${filmId}`);
  }

  deleteComment(commentId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`/api/comments/comment/${commentId}`, { headers });
  }

  addMovieRate(filmId: number, grade: number): Observable<ApiResponse<Rating>> {
    return this.http.post<ApiResponse<Rating>>(`/api/rates/rate`, { filmId, grade }, { headers });
  }

  getMovieRateCount(filmId: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`/api/rates/rate/count/film/${filmId}`);
  }

  getMovieRateAverage(filmId: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`/api/rates/rate/average/film/${filmId}`);
  }

  getMovieRate(filmId: number): Observable<PagedApiResponse<Rating[]>> {
    return this.http.get<PagedApiResponse<Rating[]>>(`/api/rates/film/${filmId}`);
  }

  deleteMovieRate(rateId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`/api/rates/rate/${rateId}`, { headers });
  }
}
