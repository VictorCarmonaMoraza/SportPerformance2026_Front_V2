import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricsApi } from '../interfaces/metrics-interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private metricUrl = `${environment.apiUrl}/metrics`;
  readonly #http = inject(HttpClient)

  getMetricsLaskWeek(deportista_id: number): Observable<MetricsApi.MetricsResponse> {
    return this.#http.get<MetricsApi.MetricsResponse>(
      `${this.metricUrl}/getlastWeek/${deportista_id}`
    );
  }
}
