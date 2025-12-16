import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';

import { EChartsOption } from 'echarts';
import { Charts } from '../charts/charts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-evolution-graph',
  imports: [Charts],
  templateUrl: './evolution-graph.html',
  styleUrl: './evolution-graph.css',
})
export class EvolutionGraph {

  @ViewChild('chart') chartElement!: ElementRef<HTMLDivElement>;

  // typeGraph = input.required<string>();
  // data = input.required<string[]>();
  // dataSerie = input.required<number[]>();
  options = input.required<echarts.EChartsOption>();

  ngAfterViewInit(): void {

    // 1. Initialize ECharts using the ViewChild reference
    const chartDom = this.chartElement.nativeElement;
    const myChart = echarts.init(chartDom);

    myChart.setOption(this.options())
  }
}
