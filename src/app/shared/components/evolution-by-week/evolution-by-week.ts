import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { map, NEVER, tap } from 'rxjs';
import { MetricsService } from '../../services/metrics-service';
import { SportService } from '../../services/sport-service';
import { Charts } from "../charts/charts";

@Component({
  selector: 'app-evolution-by-week',
  imports: [Charts],
  templateUrl: './evolution-by-week.html',
  styleUrl: './evolution-by-week.css',
})
export class EvolutionByWeek {
  //Servicios
  metricsService = inject(MetricsService)
  sportService = inject(SportService)
  readonly infoUserResource = this.sportService.infoUserResource;


  //Rutas
  activatedRoute = inject(ActivatedRoute)

  id_user = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']),
      tap(id => console.log('ID desde ruta:', id))
    )
  )

  //Desestructuramos la data para obtener el id y
  // Resource dependiente
  weekResource = rxResource({
    params: () => {
      const user = this.infoUserResource.value();
      return user ? { id: user.deportista.id } : null;
    },
    stream: ({ params }) => {
      if (!params) {
        return NEVER;
      }
      return this.metricsService
        .getMetricsLaskWeek(params.id)
        .pipe(tap(response => console.log('La respuesta es:', response)));
    }
  });

  readonly metrics = computed(() => {
    const value = this.weekResource.value();
    return value?.metrics && Array.isArray(value.metrics)
      ? value.metrics
      : [];
  });

  readonly daysOfWeek = computed(() =>
    this.metrics().map((m: { fecha: string; }) => this.getWeekDay(m.fecha))
  );

  private getWeekDay(fecha: string): string {
    return new Date(fecha).toLocaleDateString('en-GB', {
      weekday: 'short'
    });
  }

  constructor() {
    effect(() => {
      const metrics = this.metrics();
      if (!metrics.length) return;

      const ordered = [...metrics].sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );

      const last = ordered.at(-1);
      if (!last) return;

      if (last.fecha != null) {
        this.metricsService.setUltimaFecha(last.fecha);
      }

      if (last.calorias != null) {
        this.metricsService.setUltimasCalorias(Number(last.calorias));
      }

      if (last.peso != null) {
        this.metricsService.setUltimoPeso(Number(last.peso));
      }
    });


    effect(() => {
      const id = this.id_user();
      if (id) {
        this.sportService.setUserId(Number(id));
      }
    });
  }


  readonly caloriasSerie = computed(() =>
    this.metrics().map((m: { calorias: any; }) => Number(m.calorias)),
  );

  readonly distanciaSerie = computed(() =>
    this.metrics().map((m: { distancia: any; }) => Number(m.distancia))
  );

  readonly velocidadSerie = computed(() =>
    this.metrics().map((m: { velocidad_media: any; }) => Number(m.velocidad_media))
  );

  readonly isChartReady = computed(() => {
    return (
      this.weekResource.hasValue() &&
      this.metrics().length > 0
    );
  });


  /* ========= OPCIÓN ECHARTS (REACTIVA) ========= */
  readonly option = computed<EChartsOption | null>(() => {
    if (!this.isChartReady()) {
      return null;
    }

    return {
      tooltip: { trigger: 'item' },
      legend: {
        top: 1,
        left: 'center',
        data: ['Distancia (km)', 'Velocidad media (km/h)'],
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: '#2c3e50',
          fontWeight: 'bold'
        }
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '7%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.daysOfWeek(),
        axisLabel: {
          show: true,
          color: '#000'
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'right',
          axisLabel: {
            color: '#2c3e50',
            fontSize: 12,
            fontWeight: 'bold'
          },
        },
        {
          type: 'value',
          position: 'right',
          offset: 60
        }
      ],
      series: [
        {
          name: 'Distancia (km)',
          type: 'line',

          data: this.distanciaSerie(),
          lineStyle: {
            color: '#E74C3C',
            width: 3
          },
          itemStyle: {
            color: '#E74C3C'
          },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Velocidad media (km/h)',
          type: 'line',
          data: this.velocidadSerie(),
          lineStyle: {
            color: '#1E5EFF',
            width: 3
          },
          itemStyle: {
            color: '#1E5EFF'
          },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };
  });


}
