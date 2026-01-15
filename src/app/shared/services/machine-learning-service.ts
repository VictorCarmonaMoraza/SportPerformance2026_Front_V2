import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PredictionApi } from '../interfaces/prediction-calories-interface';

@Injectable({
  providedIn: 'root',
})
export class MachineLearningService {
  private machineLearningUrl = `${environment.apiUrl}/machine_learning`;
  readonly #http = inject(HttpClient)

  getCaloriesPrediction(deportistaId: number): Observable<PredictionApi.PredictionResponse> {
    return this.#http.get<PredictionApi.PredictionResponse>(
      `${this.machineLearningUrl}/machine_learning_calories/${deportistaId}`
    );
  }

  getVelocidadMediaPrediction(deportistaId: number): Observable<PredictionApi.PredictionResponse> {
    return this.#http.get<PredictionApi.PredictionResponse>(
      `${this.machineLearningUrl}/machine_learning_velocidad_media/${deportistaId}`
    );
  }

  getFrecuenciaCardiacaPrediction(deportistaId: number): Observable<PredictionApi.PredictionResponse> {
    return this.#http.get<PredictionApi.PredictionResponse>(
      `${this.machineLearningUrl}/machine_learning_frecuencia_cardiaca/${deportistaId}`
    );
  }

  getPesoPrediction(deportistaId: number): Observable<PredictionApi.PredictionResponse> {
    return this.#http.get<PredictionApi.PredictionResponse>(
      `${this.machineLearningUrl}/machine_learning_peso/${deportistaId}`
    );
  }
}
