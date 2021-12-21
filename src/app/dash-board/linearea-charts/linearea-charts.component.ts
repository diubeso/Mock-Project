import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/service/chart.service';
interface TimeValue {
  Date: string;
  Caseconfirmed: any;
}
@Component({
  selector: 'app-linearea-charts',
  templateUrl: './linearea-charts.component.html',
  styleUrls: ['./linearea-charts.component.css'],
})
export class LineareaChartsComponent implements OnInit {
  @Input() IsoCountry = '';
  Count: number = 0;
  Confirm!: number[];
  chartOptions: Highcharts.Options;
  highcharts = Highcharts;
  datavalue: any;
  Value: any;
  GetValue: any;
  constructor(private service: ChartService, private router: ActivatedRoute) {
    this.chartOptions = {
      title: {
        text: '',
      },
      chart: {
        zoomType: 'x',
        type: 'spline',
        width: 540,
        height: 450,
        events: {
          load() {
            const chart = this;
            chart.showLoading('Loading data...');
            setTimeout(function () {
              chart.hideLoading();
            }, 1000);
          },
        },
      },

      lang: {
        noData: 'No data to display',
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 400,
            },
            chartOptions: {
              legend: {
                enabled: true,
              },
            },
          },
        ],
      },
      legend: {
        layout: 'horizontal',
        floating: false,
        verticalAlign: 'top',
      },
      plotOptions: {
        series: {
          animation: {
            duration: 3000,
          },
          dataLabels: {},
        },
        area: {
          marker: {
            enabled: true,
            symbol: '',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      xAxis: {
        
        offset: 2,
        lineWidth: 2,
        crosshair: {
          width: 2,
        },
      },
      yAxis: {
        title: {
          text: 'Case Confirmed',
        },

        lineWidth: 2,
        offset: 15,
        tickWidth: 2,
        alignTicks: true,
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
      tooltip: {
        shared: true,
      },

      series: [
        {
          data: [],
          type: 'spline',
          name: 'Death',
          color: '#333',
          lineWidth: 5,
        },
        {
          data: [],
          type: 'spline',
          name: 'Confirmed',
          color: '#6d37ab',
          lineWidth: 3,

        },
        
      ],
    };
  }
  ngOnInit() {
    //Get Data From api
    //
    this.router.paramMap.subscribe((param) => {
      this.GetValue = param.get('Coutry');
      if (this.GetValue == 'Nodata') {
        this.GetValue = 'VN';
      }
      this.service.GetTimeseriesByIso2(this.GetValue).subscribe((data) => {
        this.datavalue = data;
        this.OnUpdateVal('week');
      });
    });
  }
  OnUpdateVal(Day: string) {
    let timvalue = [];
    let ConfirmedCase = [];
    let DeathCase = [];
    let NewCase = [];
    // let Recovered = [];
    let getvalDay = 0;
    let length = Object.keys(this.datavalue[0].timeseries).length;
    switch (Day) {
      case 'All':
        getvalDay = length;
        this.Value = Object.keys(this.datavalue[0].timeseries);
        break;
      case 'month':
        getvalDay = 30;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      case '2month':
        getvalDay = 60;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      case 'week':
        getvalDay = 7;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      default:
        getvalDay = 0;
    }
    let deathss = [];
    let recovereds = [];
    for (const key of this.Value) {
      timvalue.push(key);
      ConfirmedCase.push(this.datavalue[0].timeseries[key].confirmed);
      DeathCase.push(this.datavalue[0].timeseries[key].deaths);
      // Recovered.push(this.datavalue[0].timeseries[key].recovered);
    }
    timvalue.shift();
    for (let i = 1; i < this.Value.length; i++) {
      var confimred = ConfirmedCase[i] - ConfirmedCase[i - 1];
      var deaths = DeathCase[i] - DeathCase[i - 1];
      // var recovered = Recovered[i] - Recovered[i - 1];
      NewCase.push(confimred);
      deathss.push(deaths);
      // recovereds.push(recovered);
    }
    let totalconfirmed = NewCase.reduce((pre, cur) => pre + cur);
    let TotalDeaths = deathss.reduce((pre, cur) => pre + cur);
    // let TotalRecovered = recovereds.reduce((pre, cur) => pre + cur);
    this.chartOptions = {
      chart: {
        events: {
          redraw() {
            const chart = this;
            chart.showLoading('Loading data...');
            setTimeout(function () {
              chart.hideLoading();
            }, 1000);
          },
        },
      },
      series: [
        {
          type: 'spline',
          data: deathss,
          tooltip: {
            valueSuffix: '',
          },
        },
        {
          type: 'spline',
          data: NewCase,
          tooltip: {
            valueSuffix: '',
          },
        },
        {
          type: 'spline',
          data: [
            // {
            //   name: 'Recovered',
            //   y: TotalRecovered,
            //   color: '#fafa',
            // },

            {
              name: 'Confirmed',
              y: totalconfirmed,
              color: '#e66d50',
            },
            {
              name: 'Death ',
              y: TotalDeaths,
              color: '#333',
            },
          ],
        },
      ],
      xAxis: {
        categories: timvalue,
      },
    };
  }
}
