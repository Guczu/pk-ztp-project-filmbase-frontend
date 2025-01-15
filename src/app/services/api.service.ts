import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../types/Films';
import { ApiResponse, PagedApiResponse } from '../types/General';
import { Auth } from '../types/Auth';
import { Rating } from '../types/Rate';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = '/api';

  constructor(
    private http: HttpClient,
  ) {}

  login(username: string, password: string): Observable<ApiResponse<Auth>> {
    return this.http.post<ApiResponse<Auth>>(`${this.API_URL}/auth/login`, { username, password })
  }

  register(username: string, password: string): Observable<PagedApiResponse<Auth>> {
    return this.http.post<PagedApiResponse<Auth>>(`${this.API_URL}/auth/register`, { username, password })
  }

  refreshToken(userId: number, accessToken: string, refreshToken: string): Observable<ApiResponse<Auth>> {
    return this.http.post<ApiResponse<Auth>>(`${this.API_URL}/auth/token`, { userId, accessToken, refreshToken })
  }

  getMovies(paginationParams?: HttpParams): Observable<PagedApiResponse<Film[]>> {
    return this.http.get<PagedApiResponse<Film[]>>(`${this.API_URL}/films`, { params: paginationParams });
  }

  getMovie(filmId: number): Observable<ApiResponse<Film>> {
    return this.http.get<ApiResponse<Film>>(`${this.API_URL}/films/film/${filmId}`);
  }

  addMovieComment(comment: string, filmId: number): Observable<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(`${this.API_URL}/comments/comment`, { comment, filmId });
  }

  getComments(filmId: number): Observable<PagedApiResponse<Comment[]>> {
    return this.http.get<PagedApiResponse<Comment[]>>(`${this.API_URL}/comments/film/${filmId}`);
  }

  deleteComment(commentId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.API_URL}/comments/comment/${commentId}`);
  }

  addMovieRate(filmId: number, grade: number): Observable<ApiResponse<Rating>> {
    return this.http.post<ApiResponse<Rating>>(`${this.API_URL}/rates/rate`, { filmId, grade });
  }

  getMovieRateCount(filmId: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.API_URL}/rates/rate/count/film/${filmId}`);
  }

  getMovieRateAverage(filmId: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.API_URL}/rates/rate/average/film/${filmId}`);
  }

  getMovieRate(filmId: number): Observable<PagedApiResponse<Rating[]>> {
    return this.http.get<PagedApiResponse<Rating[]>>(`${this.API_URL}/rates/film/${filmId}`);
  }

  getUserMovieRate(filmId: number): Observable<ApiResponse<Rating>> {
    return this.http.get<ApiResponse<Rating>>(`${this.API_URL}/rates/rate/user/film/${filmId}`);
  }

  deleteMovieRate(rateId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.API_URL}/rates/rate/${rateId}`);
  }
}
