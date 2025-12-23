import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Charts } from "../charts/charts";

@Component({
  selector: 'app-evolution-by-month',
  imports: [Charts],
  templateUrl: './evolution-by-month.html',
  styleUrl: './evolution-by-month.css',
})
export class EvolutionByMonth {
  // diasDelMes = [
  //   '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  //   '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  //   '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  // ];
  // dataSerie = this.diasDelMes

  // const weatherIcons = {
  //   Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
  //   Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
  //   Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
  // };



  option: EChartsOption = {
    // title: {
    //   text: 'Weather Statistics',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      top: 1,
      left: 'center',
      data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE'],
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],   // ✔ ahora es tupla válida
        selectedMode: 'single',
        data: [
          {
            value: 1548,
            name: 'CityE',
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2
            },
            label: {
              // formatter: [
              //   '{title|{b}}{abg|}',
              //   '  {weatherHead|Weather}{valueHead|Days}{rateHead|Percent}',
              //   '{hr|}',
              //   '  {Sunny|}{value|202}{rate|55.3%}',
              //   '  {Cloudy|}{value|142}{rate|38.9%}',
              //   '  {Showers|}{value|21}{rate|5.8%}'
              // ].join('\n'),
              // backgroundColor: '#eee',
              // borderColor: '#777',
              // borderWidth: 1,
              // borderRadius: 4,
              // rich: { /* ... */ }
            }
          },
          {
            value: 735, name: 'CityC',
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2
            },
          },
          {
            value: 510, name: 'CityD',
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2
            },
          },
          {
            value: 434, name: 'CityB',
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2
            },
          },
          {
            value: 335, name: 'CityA',
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2
            },
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };



}
