import { inject, Injectable, signal } from '@angular/core';
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

  // Estado compartido
  ultimoPeso = signal<number | null>(null);
  ultimasCalorias = signal<number | null>(null);
  ultimaFecha = signal<string | null>(null);

  setUltimasCalorias(value: number) {
    this.ultimasCalorias.set(value);
  }

  setUltimoPeso(value: number) {
    this.ultimoPeso.set(value);
  }

  setUltimaFecha(value: string) {
    this.ultimaFecha.set(value);
  }

  getMetricsLaskWeek(deportista_id: number): Observable<MetricsApi.MetricsResponse> {
    return this.#http.get<MetricsApi.MetricsResponse>(
      `${this.metricUrl}/getlastWeek/${deportista_id}`
    );
  }
}
