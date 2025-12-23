import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserApi } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private metricUrl = `${environment.apiUrl}/user`;
  readonly #http = inject(HttpClient)


  getUserPhoto(userId: number): Observable<UserApi.UserResponse> {
    return this.#http.get<UserApi.UserResponse>(
      `${this.metricUrl}/${userId}/photo`
    );
  }



}
