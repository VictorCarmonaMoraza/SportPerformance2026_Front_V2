import { Component, computed, effect, inject, signal } from '@angular/core';
import ChartPrediction from '../../../shared/components/chart-prediction/chart-prediction';
import { EvolutionByWeek } from '../../../shared/components/evolution-by-week/evolution-by-week';
import { EvolutionByYear } from '../../../shared/components/evolution-by-year/evolution-by-year';
import { PredictionApi } from '../../../shared/interfaces/prediction-calories-interface';
import { MachineLearningService } from '../../../shared/services/machine-learning-service';
import { MetricsService } from '../../../shared/services/metrics-service';
import { SportService } from '../../../shared/services/sport-service';


@Component({
  selector: 'app-user-metrics-page',
  imports: [EvolutionByWeek, EvolutionByYear, ChartPrediction],
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

  /* ===== Recursos ===== */
  readonly infoUserResource = this.sportService.infoUserResource;
  readonly deportista = this.sportService.deportista;

  constructor() {
    effect(() => {
      const user = this.infoUserResource.value();
      if (!user) return;

      this.metricsService.setDeportistaId(user.deportista.id);

      this.title = user.deportista.disciplina_deportiva;
    });
  }

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
