import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { jwtDecode } from "jwt-decode";
import { Auth, DecodedToken } from '../types/Auth';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../types/General';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userId = 'user_id';
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  isLoggedIn = signal<boolean>(false);

  constructor(
    private router: Router,
    private api: ApiService,
  ) {
    this.isLoggedIn.set(!!this.getAccessToken());
  }

  login(username: string, password: string): Observable<ApiResponse<Auth>> {
    return this.api.login(username, password).pipe(
      tap((tokens) => {
        this.saveTokens(tokens.data.userId, tokens.data.accessToken, tokens.data.refreshToken);
        this.isLoggedIn.set(true);
        this.router.navigate(['/']);
      }),
      catchError((err) => {
        console.error('Login failed', err);
        return throwError(() => err);
      })
    );
  }

  logout() {
    this.clearTokens();
    this.isLoggedIn.set(false);
    this.router.navigate(['/home']);
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem(this.accessTokenKey);
    if (!token) {
      this.isLoggedIn.set(false);
      return false;
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const expirationDate = decodedToken.exp * 1000;
    const isValid = Date.now() < expirationDate;

    if (!isValid) {
      this.logout();
    }

    this.isLoggedIn.set(isValid);

    return isValid;
  }

  private saveTokens(userId: number, accessToken: string, refreshToken: string) {
    localStorage.setItem(this.userId, userId.toString());
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private clearTokens() {
    localStorage.removeItem(this.userId);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  private getUserId(): number | null {
    const userId = localStorage.getItem(this.userId);
    if (!userId) return null;
    return parseInt(userId);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
}