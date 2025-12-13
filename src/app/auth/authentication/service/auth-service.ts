import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginResponse } from '../../interfaces/auth-interface';
import { RegisterResponse } from '../../interfaces/register-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase = environment.apiUrl;
  readonly #http = inject(HttpClient)

  login(nameuser: string, password: string): Observable<LoginResponse.Login> {
    return this.#http.post<LoginResponse.Login>(`${this.urlBase}/login`, { nameuser, password });
  }

  //Register
  register(email: string, password: string, nameuser: string): Observable<RegisterResponse.Register> {
    return this.#http.post<RegisterResponse.Register>(`${this.urlBase}/register`, {
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

