import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { MetricsApi } from '../interfaces/metrics-interface';
import { rxResource } from '@angular/core/rxjs-interop';

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

  //Parte anual

  /* ===============================
  * ID COMPARTIDO DEL DEPORTISTA
  * =============================== */
  private readonly deportistaId = signal<number | null>(null);

  setDeportistaId(id: number) {
    this.deportistaId.set(id);
  }

  /* ===============================
   * MÉTRICAS ANUALES (API)
   * =============================== */
  private getMetricsLastYear(deportistaId: number) {
    return this.#http.get<MetricsApi.MetricsResponse>(
      `${this.metricUrl}/lastYear/${deportistaId}`
    );
  }

  /* ===============================
   * RESOURCE ANUAL
   * =============================== */
  readonly yearMetricsResource = rxResource({
    params: () => {
      const id = this.deportistaId();
      return id ? { id } : null;
    },
    stream: ({ params }) => {
      if (!params) return NEVER;
      return this.getMetricsLastYear(params.id);
    }
  });

  /* ===============================
   * SELECTOR REACTIVO (✔ SIGNAL REAL)
   * =============================== */
  readonly yearMetrics = computed(() =>
    this.yearMetricsResource.value()?.metrics ?? []
  );
}







