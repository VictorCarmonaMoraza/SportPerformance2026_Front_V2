import {
  Component,
  effect,
  ElementRef,
  input,
  ViewChild,
  computed
} from '@angular/core';
import * as echarts from 'echarts';
import { PredictionApi } from '../../interfaces/prediction-calories-interface';

@Component({
  selector: 'app-chart-prediction',
  standalone: true,
  templateUrl: './chart-prediction.html',
  styleUrl: './chart-prediction.css',
})
export default class ChartPrediction {

  @ViewChild('chartPrediction', { static: false })
  chartElement!: ElementRef<HTMLDivElement>;

  // 👉 INPUTS
  predictions = input.required<PredictionApi.Prediction[]>();
  unit = input.required<string>();

  private chart!: echarts.ECharts;
  private resizeObserver!: ResizeObserver;

  // 👉 Opciones del chart
  chartOption = computed<echarts.EChartsOption>(() => {
    const predictions = this.predictions();

    // 🔒 valores numéricos seguros
    const values = predictions
      .map(p => p.predicciones)
      .filter((v): v is number => typeof v === 'number');

    if (values.length === 0) {
      return { series: [] };
    }

    const dates = predictions.map(p => {
      const d = new Date(p.fecha);
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    });

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.2 || 1;

    return {
      grid: {
        top: 16,
        bottom: 36,
        left: 50,
        right: 20,
        containLabel: true
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: (params: any) => {
          const p = params[0];
          return `
            <strong>${p.axisValue}</strong><br/>
            ${Number(p.value).toFixed(2)} ${this.unit()}
          `;
        }
      },

      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          margin: 8,
          color: '#000000'
        }
      },

      yAxis: {
        type: 'value',
        min: minValue - padding,
        max: maxValue + padding,
        scale: true,
        splitNumber: 4,
        axisLabel: {
          formatter: (v: number) => v.toFixed(2),
          color: '#000000'
        }
      },

      series: [
        {
          type: 'line',
          data: values,

          // 🟢 ANIMACIÓN PROGRESIVA DE LA LÍNEA
          animation: true,
          animationDuration: 1600,
          animationEasing: 'cubicOut',
          animationDelay: (idx: number) => idx * 80,

          symbol: 'circle',
          showSymbol: true,
          symbolSize: 6,

          lineStyle: {
            color: 'red',
            width: 3
          },
          itemStyle: {
            color: 'blue'
          }
        }
      ]
    };
  });

  constructor() {
    effect(() => {
      if (!this.chart) return;

      // 🔑 NO reinicia animación en cada cambio
      this.chart.setOption(this.chartOption(), { notMerge: false });
    });
  }

  ngAfterViewInit(): void {
    const dom = this.chartElement.nativeElement;
    this.chart = echarts.init(dom);

    // 🔑 Animación SOLO la primera vez
    this.chart.setOption(this.chartOption(), { notMerge: true });

    this.resizeObserver = new ResizeObserver(() => {
      this.chart.resize();
    });

    this.resizeObserver.observe(dom);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.chart?.dispose();
  }
}
