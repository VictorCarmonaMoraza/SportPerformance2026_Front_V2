import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginResponse, Usuario } from '../../interfaces/auth-interface';
import { RegisterResponse } from '../../interfaces/register-interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth`;
  readonly #http = inject(HttpClient)

  //Nuevo
  private _authStatus = signal<AuthStatus>('checking');

  _user = signal<Usuario | null>(null);
  private _token = signal<string | null>(null);

  authStatus = computed<AuthStatus>(() => {
    if (this.authStatus() === 'checking') return 'checking'

    if (this._user()) {
      return 'authenticated'
    }
    return 'not-authenticated'

  })

  user = computed(() => this._user())
  toke = computed(this._token);




  login(nameuser: string, password: string): Observable<boolean> {
    return this.#http.post<LoginResponse>(`${this.authUrl}/login`, { nameuser, password })
      .pipe(
        tap(resp => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);

          //Grabar token en localStorage
          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated')
          return of(false);
        })
      );
  }

  //Fin nuevo

  //Register
  register(email: string, password: string, nameuser: string): Observable<RegisterResponse> {
    return this.#http.post<RegisterResponse>(`${this.authUrl}/register`, {
      email: email,
      password: password,
      nameuser: nameuser
    })
    //.pipe(
    //   map((resp) => this.handleAuthSuccess(resp)),
    //   // map(() => true),
    //   //Cualquier estado que no sea 200 cae aquí
    //   catchError((error: any) => this.handleAuthError(error))
    // );
  }


  //Fin register



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

