import { Component, ElementRef, input, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts {
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
