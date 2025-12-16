import { Component } from '@angular/core';
import { Charts } from "../charts/charts";
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-evolution-by-year',
  imports: [Charts],
  templateUrl: './evolution-by-year.html',
  styleUrl: './evolution-by-year.css',
})
export class EvolutionByYear {
  monthYear = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  dataSerieYear = [34, 78, 12, 65, 90, 47, 23, 81, 56, 14, 92, 38]

  option: EChartsOption = {
    // title: {
    //   text: 'ECharts Getting Started Example'
    // },
    tooltip: {},
    color: 'red',
    xAxis: {
      axisLabel: {
        interval: 0,
        rotate: 45,
        color: 'blue'
      },
      data: this.monthYear
    },

    yAxis: {
      axisLabel: {
        color: 'blue'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'black'  // ← CAMBIA ESTO AL COLOR QUE QUIERAS
          // por ejemplo: '#333', 'white', '#888', etc.
        }
      }
    },
    series: [
      {
        name: 'sales',
        type: 'line',
        data: this.dataSerieYear,
      }
    ]
  }
}
