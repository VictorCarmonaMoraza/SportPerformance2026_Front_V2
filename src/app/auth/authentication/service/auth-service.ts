import { inject, Injectable } from '@angular/core';
import { AuthInterface } from '../../interfaces/auth-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase = environment.apiUrl;
  readonly #http = inject(HttpClient)

  login(nameuser: string, password: string): Observable<AuthInterface.InfoUser> {
    return this.#http.post<AuthInterface.InfoUser>(`${this.urlBase}/login`, { nameuser, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

