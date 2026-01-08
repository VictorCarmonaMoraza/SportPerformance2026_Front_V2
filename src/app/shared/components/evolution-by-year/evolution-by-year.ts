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

  private readonly metricsService = inject(MetricsService);

  /* ===============================
   * MÉTRICAS ANUALES (RESOURCE)
   * =============================== */
  readonly metrics = this.metricsService.yearMetrics;

  /* ===============================
   * ÚLTIMA FECHA DISPONIBLE
   * =============================== */
  readonly lastDate = computed<Date | null>(() => {
    const data = this.metrics();
    if (!data.length) return null;

    return data
      .map(m => new Date(m.fecha))
      .sort((a, b) => b.getTime() - a.getTime())[0];
  });

  /* ===============================
   * VENTANA DE 12 MESES DESLIZANTE
   * =============================== */
  readonly monthsWindow = computed(() => {
    const last = this.lastDate();
    if (!last) return [];

    const months: { year: number; month: number; label: string }[] = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(last.getFullYear(), last.getMonth() - i, 1);

      months.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        label: d.toLocaleDateString('es-ES', {
          month: 'long',
          year: 'numeric',
        }),
      });
    }

    return months;
  });

  /* ===============================
   * CALORÍAS TOTALES POR MES
   * =============================== */
  readonly caloriesSerie = computed<(number | null)[]>(() => {
    const metrics = this.metrics();

    return this.monthsWindow().map(w => {
      const monthData = metrics.filter(m => {
        const d = new Date(m.fecha);
        return d.getFullYear() === w.year && d.getMonth() === w.month;
      });

      if (!monthData.length) return null;

      return monthData.reduce(
        (sum, m) => sum + Number(m.calorias ?? 0),
        0
      );
    });
  });

  /* ===============================
   * DISTANCIA MEDIA POR MES
   * =============================== */
  readonly distanceAvgSerie = computed<(number | null)[]>(() => {
    const metrics = this.metrics();

    return this.monthsWindow().map(w => {
      const monthData = metrics.filter(m => {
        const d = new Date(m.fecha);
        return d.getFullYear() === w.year && d.getMonth() === w.month;
      });

      if (!monthData.length) return null;

      const total = monthData.reduce(
        (sum, m) => sum + Number(m.distancia ?? 0),
        0
      );

      return Number((total / monthData.length).toFixed(2));
    });
  });

  /* ===============================
   * ETIQUETAS DEL EJE X
   * =============================== */
  readonly xAxisLabels = computed(() =>
    this.monthsWindow().map(m =>
      m.label.charAt(0).toUpperCase() + m.label.slice(1)
    )
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
      },
    },

    legend: {
      top: 0,
      data: ['Calorías', 'Distancia media'],
    },

    grid: {
      top: 48,
      bottom: 50,
      left: 32,
      right: 48,
    },

    xAxis: {
      type: 'category',
      data: this.xAxisLabels(),
      axisLabel: { rotate: 45 },
    },

    yAxis: [
      {
        type: 'value',
        name: 'Calorías',
        axisLabel: { formatter: '{value} kcal' },
        splitLine: {
          show: true,
          lineStyle: { color: '#333' },
        },
      },
      {
        type: 'value',
        name: 'Distancia media (km)',
        axisLabel: { formatter: '{value} km' },
      },
    ],

    series: [
      {
        name: 'Calorías',
        type: 'bar',
        data: this.caloriesSerie(),
        itemStyle: { color: '#1E90FF' },
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
          color: '#2ECC71',
        },
      },
    ],
  }));
}
