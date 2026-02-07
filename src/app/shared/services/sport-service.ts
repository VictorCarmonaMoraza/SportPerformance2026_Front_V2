import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SportApi } from '../interfaces/sport-interface';
import { NEVER, Observable, catchError, map, of, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SportService {

  activatedRoute = inject(ActivatedRoute);

  readonly id_deportista = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(pm => {
        const id = pm.get('id');
        return id ? Number(id) : null;
      }),
      tap(id => console.log('🧭 ID desde ruta:', id))
    ),
    { initialValue: null }
  );

  /* ===============================
   * DEPENDENCIAS
   * =============================== */
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/sport`;

  /* ===============================
   * ESTADO INTERNO
   * =============================== */
  private readonly userId = signal<number | null>(null);

  /* ===============================
   * API
   * =============================== */
  private getInfoUser(deportistaId: number): Observable<SportApi.SportResponse> {
    return this.http.get<SportApi.SportResponse>(
      `${this.baseUrl}/getInfoSport/${deportistaId}`
    );
  }

  setUserId(id: number): void {
    this.userId.set(id);
  }

  /* ===============================
   * RESOURCE INFO USUARIO
   * =============================== */
  readonly infoUserResource = rxResource({
    params: () => {
      const id = this.id_deportista();
      return id ? { id } : null;
    },
    stream: ({ params }) => {
      if (!params) return NEVER;

      const { id } = params; // ✔️ TS seguro

      return this.getInfoUser(id).pipe(
        catchError(err => {
          console.warn('⚠️ Error cargando infoUser', err);

          // 🔑 MUY IMPORTANTE:
          // El resource NO debe entrar en estado error
          return of(null);
        })
      );
    }
  });

  /* ===============================
   * SELECTOR DEPORTISTA
   * =============================== */
  readonly deportista = computed<SportApi.Deportista | null>(() =>
    this.infoUserResource.value()?.data ?? null
  );

  /* ===============================
   * RECARGA MANUAL
   * =============================== */
  reloadInfoUser(): void {
    this.infoUserResource.reload();
  }

  /* ===============================
   * DEBUG RESOURCE (solo desarrollo)
   * =============================== */
  readonly debugInfoUserResource = effect(() => {
    const error = this.infoUserResource.error();

    if (error) {
      console.error('🔥 infoUserResource EN ERROR', {
        error,
        cause: (error as any)?.cause,
      });
    }
  });
}
