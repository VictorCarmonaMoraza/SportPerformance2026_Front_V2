import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { EvolutionByWeek } from '../../../shared/components/evolution-by-week/evolution-by-week';
import { EvolutionByYear } from '../../../shared/components/evolution-by-year/evolution-by-year';
import { MetricsService } from '../../../shared/services/metrics-service';
import { SportService } from '../../../shared/services/sport-service';
import { MachineLearningService } from '../../../shared/services/machine-learning-service';
import { PredictionApi } from '../../../shared/interfaces/prediction-calories-interface';
import ChartPrediction from '../../../shared/components/chart-prediction/chart-prediction';


@Component({
  selector: 'app-user-metrics-page',
  imports: [EvolutionByWeek, EvolutionByYear, DatePipe, ChartPrediction],
  templateUrl: './user-metrics-page.html',
  styleUrl: './user-metrics-page.css',
})
export class UserMetricsPage {
  private readonly sportService = inject(SportService);
  private readonly metricsService = inject(MetricsService);
  private readonly machineLearningService = inject(MachineLearningService);
  predictions: PredictionApi.Prediction[] = [];
  title: string = '';
  unidad = 'cal'

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
  readonly lastMetricResource = this.metricsService.lastMetricResource;

  readonly lastMetric = computed(() => {
    const response = this.lastMetricResource.value();
    return response?.metrics?.length ? response.metrics[0] : null;
  });




  constructor() {
    effect(() => {
      const user = this.infoUserResource.value();
      if (!user) return;

      this.metricsService.setDeportistaId(user.deportista.id);

      this.title = user.deportista.disciplina_deportiva;
    });


    // ⬇️ NUEVO EFFECT: última métrica
    effect(() => {
      const metric = this.lastMetric();
      if (!metric) return;

      this.metricsService.setUltimaFecha(metric.fecha);

      if (metric.calorias != null) {
        this.metricsService.setUltimasCalorias(Number(metric.calorias));
      }

      if (metric.peso != null) {
        this.metricsService.setUltimoPeso(Number(metric.peso));
      }
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

  PredictionCalories() {
    //Llamamos al metodo predicciones con el id del usuario
    this.machineLearningService.getCaloriesPrediction(this.infoUserResource.value()?.deportista.id!).subscribe({
      next: (response) => {
        this.predictions = response.predictions;
        console.log('Las predicciones son:', this.predictions);

        //this.loading = false;
      },
      error: (err) => {
        //this.error = err?.error?.error ?? 'Error al obtener predicciones';
        //this.loading = false;
      }
    });

  }
}
