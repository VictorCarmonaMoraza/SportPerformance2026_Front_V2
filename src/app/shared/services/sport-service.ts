import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SportApi } from '../interfaces/sport-interface';
import { NEVER, Observable } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  private metricUrl = `${environment.apiUrl}/sport`;
  readonly #http = inject(HttpClient)

  private userId = signal<number | null>(null);

  getInfoUser(deportista_id: number): Observable<SportApi.SportResponse> {
    return this.#http.get<SportApi.SportResponse>(
      `${this.metricUrl}/getInfoSport/${deportista_id}`
    );
  }

  setUserId(id: number) {
    this.userId.set(id);
  }

  readonly infoUserResource = rxResource({
    params: () => {
      const id = this.userId();
      return id ? { id } : null;
    },
    stream: ({ params }) => {
      if (!params) {
        return NEVER;
      }
      return this.getInfoUser(params.id);
    }
  });

  readonly deportista = computed(() =>
    this.infoUserResource.value()?.deportista ?? null
  );

}
