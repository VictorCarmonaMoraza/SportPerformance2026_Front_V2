import {
  Component,
  ElementRef,
  ViewChild,
  input,
  AfterViewInit,
  OnDestroy,
  effect
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts implements AfterViewInit, OnDestroy {

  @ViewChild('chart', { static: true })
  chartElement!: ElementRef<HTMLDivElement>;

  options = input.required<echarts.EChartsOption>();

  private chart!: echarts.ECharts;
  private resizeObserver!: ResizeObserver;

  constructor() {
    effect(() => {
      const option = this.options();
      if (!this.chart || !option) return;

      this.chart.setOption(option, { notMerge: true });
      this.chart.resize();
    });
  }

  ngAfterViewInit(): void {
    const dom = this.chartElement.nativeElement;

    this.chart = echarts.init(dom);

    this.chart.setOption(this.options(), {
      notMerge: true,
      lazyUpdate: false
    });

    // 🔥 OBSERVA CAMBIOS REALES DE TAMAÑO
    this.resizeObserver = new ResizeObserver(() => {
      this.chart.resize({
        width: 'auto',
        height: 'auto',
        animation: { duration: 300 }
      });
    });

    this.resizeObserver.observe(dom);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.chart?.dispose();
  }
}
