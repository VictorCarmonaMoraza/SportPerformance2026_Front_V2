
export namespace MetricsApi {

  export interface MetricsResponse {
    message: string;
    metrics?: Metric[];
    numero_registros?: number;
    status: number;
  }

  export interface Metric {
    altura: string;
    calorias: number;
    deportista_id: number;
    distancia: string;
    fecha: string;
    frecuencia_cardiaca: number;
    id: number;
    peso: string;
    velocidad_media: string;
  }

}
