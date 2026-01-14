
export namespace PredictionApi {

  export interface PredictionResponse {
    message: string;
    predictions: Prediction[];
    status: number;
  }

  export interface Prediction {
    calorias_predichas: number;
    fecha: Date;
  }
}
