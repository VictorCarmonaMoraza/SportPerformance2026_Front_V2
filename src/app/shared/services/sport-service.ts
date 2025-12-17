import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SportApi } from '../interfaces/sport-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  private metricUrl = `${environment.apiUrl}/sport`;
  readonly #http = inject(HttpClient)

  getInfoUser(deportista_id: number): Observable<SportApi.SportResponse> {
    return this.#http.get<SportApi.SportResponse>(
      `${this.metricUrl}/getInfoSport/${deportista_id}`
    );
  }

}
