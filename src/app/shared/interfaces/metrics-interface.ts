
export namespace MetricsApi {

  export interface MetricsResponse {
    message: string;
    metrics?: Metric[];
    numero_registros?: number;
    status: number;
  }

  export interface Metric {
    id: number;
    deportista_id: number;
    fecha: string;
    peso: number | null;
    altura: number | null;
    frecuencia_cardiaca: number | null;
    velocidad_media: number | null;
    distancia: number | null;
    calorias: number | null;
    duracion_min: number | null;
    fc_media: number | null;
    fc_max: number | null;
    ritmo_medio: number | null;
    rpe: number | null;
  }

}
