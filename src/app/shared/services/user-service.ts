import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserApi } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private metricUrl = `${environment.apiUrl}/user`;
  readonly #http = inject(HttpClient)


  getUserPhoto2(userId: number): Observable<UserApi.UserResponse> {
    return this.#http.get<UserApi.UserResponse>(
      `${this.metricUrl}/${userId}/photo`
    );
  }


  getUserPhoto(userId: number) {
    return this.#http
      .get<{ foto_url: string }>(`${this.metricUrl}/photo/${userId}`)
      .pipe(
        catchError(err => {
          // ⚠️ Transformamos a Error REAL
          return of(null);
        })
      );
  }



}
