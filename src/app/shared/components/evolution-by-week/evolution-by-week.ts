import { Component, computed, effect, EventEmitter, inject, OnInit, output, Output } from '@angular/core';
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

  metricsService = inject(MetricsService)
  sportService = inject(SportService)
  activatedRoute = inject(ActivatedRoute)

  titleChange = output<string>();




  id_user = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']),
      tap(id => console.log('ID desde ruta:', id))
    )
  )

  infoUserResource = rxResource({
    params: () => ({ id: this.id_user() }),
    stream: ({ params }) => {
      return this.sportService.getInfoUser(params.id);
    }
  })

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


  readonly metrics = computed(() =>
    this.weekResource.value()?.metrics ?? []
  );

  readonly daysOfWeek = computed(() =>
    this.metrics().map(m => this.getWeekDay(m.fecha))
  );

  private getWeekDay(fecha: string): string {
    return new Date(fecha).toLocaleDateString('en-GB', {
      weekday: 'short'
    });
  }


  constructor() {
    effect(() => {
      const user = this.infoUserResource.value();
      const disciplina = user?.deportista?.disciplina_deportiva;

      if (disciplina) {
        this.titleChange.emit(disciplina.toString());
      }

      console.log('Información del deportista:', user);
      console.log('Calorías:', this.caloriasSerie());
      console.log('Distancia:', this.distanciaSerie());
      console.log('Velocidad media:', this.velocidadSerie());
      console.log('Días de la semana:', this.daysOfWeek());
    });
  }


  readonly caloriasSerie = computed(() =>
    this.metrics().map(m => Number(m.calorias))
  );

  readonly distanciaSerie = computed(() =>
    this.metrics().map(m => Number(m.distancia))
  );

  readonly velocidadSerie = computed(() =>
    this.metrics().map(m => Number(m.velocidad_media))
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
