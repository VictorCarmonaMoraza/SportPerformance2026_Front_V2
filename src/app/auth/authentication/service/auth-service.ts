import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterResponse } from '../../interfaces/register-interface';
import { LoginResponse, Usuario } from '../../interfaces/auth-interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth`;
  readonly #http = inject(HttpClient)

  //Nuevo
  private _authStatus = signal<AuthStatus>('checking');

  private _user = signal<Usuario | null>(null);
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


  //Fin nuevo

  login(nameuser: string, password: string) {
    return this.#http.post<LoginResponse>(`${this.authUrl}/login`, { nameuser, password })
      .pipe(
        tap(resp => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);

          //Grabar token en localStorage
          localStorage.setItem('token', resp.token);
        })
      )

  }

  //Register
  register(email: string, password: string, nameuser: string): Observable<RegisterResponse.Register> {
    return this.#http.post<RegisterResponse.Register>(`${this.authUrl}/register`, {
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

