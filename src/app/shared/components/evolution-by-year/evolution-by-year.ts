import { Component, computed, inject } from '@angular/core';
import { Charts } from '../charts/charts';
import { EChartsOption } from 'echarts';
import { MetricsService } from '../../services/metrics-service';

@Component({
  selector: 'app-evolution-by-year',
  imports: [Charts],
  templateUrl: './evolution-by-year.html',
  styleUrl: './evolution-by-year.css',
})
export class EvolutionByYear {

  private metricsService = inject(MetricsService);

  /* ===============================
   * Datos del resource anual
   * =============================== */
  readonly metrics = this.metricsService.yearMetrics;

  readonly months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  /* ===============================
   * Calorías TOTALES por mes
   * =============================== */
  readonly caloriesByMonth = computed(() => {
    const map = new Map<number, number>();

    for (const m of this.metrics()) {
      const month = new Date(m.fecha).getMonth();
      map.set(month, (map.get(month) ?? 0) + Number(m.calorias));
    }

    return map;
  });

  readonly caloriesSerie = computed<(number | null)[]>(() =>
    Array.from({ length: 12 }, (_, month) =>
      this.caloriesByMonth().get(month) ?? null
    )
  );

  /* ===============================
   * Distancia MEDIA por sesión (km)
   * =============================== */
  readonly distanceStatsByMonth = computed(() => {
    const map = new Map<number, { total: number; count: number }>();

    for (const m of this.metrics()) {
      const month = new Date(m.fecha).getMonth();
      const km = Number(m.distancia);

      if (!map.has(month)) {
        map.set(month, { total: 0, count: 0 });
      }

      const entry = map.get(month)!;
      entry.total += km;
      entry.count += 1;
    }

    return map;
  });

  readonly distanceAvgSerie = computed<(number | null)[]>(() =>
    Array.from({ length: 12 }, (_, month) => {
      const stat = this.distanceStatsByMonth().get(month);
      return stat ? Number((stat.total / stat.count).toFixed(2)) : null;
    })
  );

  /* ===============================
   * OPCIONES ECHARTS
   * =============================== */
  readonly option = computed<EChartsOption>(() => ({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const items = Array.isArray(params) ? params : [params];

        return items
          .map(p =>
            p.seriesName === 'Distancia media'
              ? `${p.marker} ${p.seriesName}: ${p.value} km`
              : `${p.marker} ${p.seriesName}: ${p.value} kcal`
          )
          .join('<br/>');
      }
    },

    legend: {
      top: 0,
      data: ['Calorías', 'Distancia media']
    },

    xAxis: {
      type: 'category',
      data: this.months,
      axisLabel: { rotate: 45 }
    },

    yAxis: [
      {
        type: 'value',
        name: 'Calorías',
        position: 'left',
        axisLabel: { formatter: '{value} kcal' },
        splitLine: {
          show: true,
          lineStyle: { color: '#333' }
        }
      },
      {
        type: 'value',
        name: 'Distancia media (km)',
        position: 'right',
        axisLabel: { formatter: '{value} km' }
      }
    ],

    series: [
      {
        name: 'Calorías',
        type: 'bar',
        data: this.caloriesSerie(),
        itemStyle: { color: '#1E90FF' }
      },
      {
        name: 'Distancia media',
        type: 'line',
        yAxisIndex: 1,
        data: this.distanceAvgSerie(),
        smooth: true,
        connectNulls: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: '#2ECC71'
        }
      }
    ]
  }));
}
