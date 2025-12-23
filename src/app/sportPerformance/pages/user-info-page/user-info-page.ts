import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { EvolutionByWeek } from "../../../shared/components/evolution-by-week/evolution-by-week";
import { EvolutionByYear } from "../../../shared/components/evolution-by-year/evolution-by-year";
import { InfoUserProfile } from "../../../shared/components/info-user-profile/info-user-profile";
import { MetricsService } from '../../../shared/services/metrics-service';
import { SportService } from '../../../shared/services/sport-service';

@Component({
  selector: 'app-user-info-page',
  imports: [EvolutionByWeek, EvolutionByYear, DatePipe, InfoUserProfile],
  templateUrl: './user-info-page.html',
  styleUrl: './user-info-page.css',
})
export class UserInfoPage {

  private readonly sportService = inject(SportService);
  private readonly metricsService = inject(MetricsService);

  title = '';

  /* ===== Signals compartidos ===== */
  ultimasCalorias = this.metricsService.ultimasCalorias;
  ultimoPeso = this.metricsService.ultimoPeso;
  ultimaFecha = this.metricsService.ultimaFecha;

  /* ===== Fecha ACTUAL FIJA (NO reactiva) ===== */
  private readonly ahora = new Date();
  // fecha actual FIJA (no reactiva)
  readonly fechaActual = signal(new Date());

  /* ===== Recursos ===== */
  readonly infoUserResource = this.sportService.infoUserResource;
  readonly deportista = this.sportService.deportista;


  ngOnInit(): void {
    console.log('infoUserResource:', this.infoUserResource.value());
    console.log('deportista:', this.deportista());
  }

  constructor() {
    effect(() => {
      const user = this.infoUserResource.value();
      if (!user) return;

      this.metricsService.setDeportistaId(user.deportista.id);

      this.title = user.deportista.disciplina_deportiva;
    });
  }

  /* ===== DÍAS DESDE ÚLTIMA FECHA (ESTABLE) ===== */
  readonly diasSinEntrenar = computed<number | null>(() => {
    const fecha = this.ultimaFecha();
    if (!fecha) return null;

    const fechaUltima = new Date(fecha);
    const diffMs = this.ahora.getTime() - fechaUltima.getTime();

    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  });
}
