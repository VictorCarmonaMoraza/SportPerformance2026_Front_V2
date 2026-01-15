import { Component, inject } from '@angular/core';
import ChartPrediction from '../../../shared/components/chart-prediction/chart-prediction';
import { EvolutionByYear } from '../../../shared/components/evolution-by-year/evolution-by-year';
import { PredictionApi } from '../../../shared/interfaces/prediction-calories-interface';
import { MachineLearningService } from '../../../shared/services/machine-learning-service';


@Component({
  selector: 'app-user-metrics-page',
  imports: [ChartPrediction],
  templateUrl: './user-metrics-page.html',
  styleUrl: './user-metrics-page.css',
})
export class UserMetricsPage {
  // private readonly sportService = inject(SportService);
  // private readonly metricsService = inject(MetricsService);
  private readonly machineLearningService = inject(MachineLearningService);
  predictions: PredictionApi.Prediction[] = [];
  predictionsVM: PredictionApi.Prediction[] = [];
  title: string = '';
  unidad = 'cal';
  unidadVM = 'km/h';
  deportistaId = localStorage.getItem('deportistaId');

  PredictionCalories() {
    //Llamamos al metodo predicciones con el id del usuario
    this.machineLearningService.getCaloriesPrediction(Number(this.deportistaId)).subscribe({
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

  PredictionCalories2() {
    console.log('Desde el metodo dos', Number(this.deportistaId))
    //Llamamos al metodo predicciones con el id del usuario
    this.machineLearningService.getVelocidadMediaPrediction(Number(this.deportistaId)).subscribe({
      next: (response) => {
        this.predictionsVM = response.predictions;
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
