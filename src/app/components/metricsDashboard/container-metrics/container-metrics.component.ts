import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { metricsData } from '../../../models/metricsData';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-container-metrics',
  templateUrl: './container-metrics.component.html',
  styleUrls: ['./container-metrics.component.css'],
})
export class ContainerMetricsComponent implements OnInit {
  public state: any;
  containerMetrics: any;
  metrcisByRrm: metricsData;
  cpu_res: any;
  mem_res: any;
  CONTAINERS_DATA: any;
  multi: any[];
  view: any[] = [700, 400];

  // Color scheme to be used for cpu & memory utilization monitoring graphs.
  colorscheme = [
    '#4DD0E1',
    '#A84DE1',
    '#E15E4D',
    '#86E14D',
    '#FFFD43',
    '#FF9F43',
    '#E81E74',
    '#AB81C3',
    '#95F3F5',
    '#4BE39A',
    '#0D439B',
    '#8FA618',
    '#C4A31F',
    '#F8DA9C',
    '#878DA8',
    '#FBB048',
    '#B21728',
    '#27090B',
    '#E89AC6',
    '#EAD726',
    '#D57F1C',
    '#D1F0B8',
    '#BF705C',
    '#9ABFE2',
    '#4B3C4A',
    '#4E7803',
    '#F5EBC4',
    '#C1D80D',
    '#A4C0B9',
    '#4E7803',
    '#C25FD0',
    '#D67E1F',
    '#131FD9',
    '#487859',
    '#80AF98',
    '#73423A',
    '#0A5B2C',
    '#E5B16A',
    '#F42070',
    '#AFE096',
    '#4C39FD',
    '#8E8909',
    '#77ACBD',
    '#185034',
    '#8CC2F8',
    '#DCFC9F',
    '#B5B731',
    '#9D6331',
    '#A4471F',
    '#292CDA',
  ];
  displayedColumns: string[] = [
    'containerName',
    'ipv4',
    'uptime',
    'lastupdated',
    'host',
  ];
  dataSource = new MatTableDataSource<ContainerData>();

  @ViewChild(MatSort) sortForDataSource: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortForDataSource;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // ngx-chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Utilization (%)';
  legendTitle: string = 'Years';

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}

  onSelect(data): void {}

  onActivate(data): void {}

  onDeactivate(data): void {}

  ngOnInit(): void {
    if (this.authService.isExpired()) {
      this.authService.removeToken();
      this.authService.authorize();
    }

    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('');
    }

    this.state = window.history.state.container;
    if (this.state != undefined) {
      this.containerMetrics = this.state;
      this.getMetricsFromInput(this.containerMetrics);
    } else {
      this.router.navigateByUrl('user-metrics');
    }
  }

  axisDigits(val: any): any {
    return new DatePipe('en').transform(val);
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val);
  }

  getMetricsFromInput(data: any) {
    this.CONTAINERS_DATA = this.getContainerInfo(data);
    this.dataSource.data = this.CONTAINERS_DATA;
    this.cpu_res = this.getCpuChartSeries(data);
    this.mem_res = this.getMemoryChartSeries(data);
  }

  getCpuChartSeries(data: any) {
    const sortedArray = data.cpu_percent.sort((a, b) => {
      return moment(a.time_stamp).diff(b.time_stamp);
    });

    return [
      {
        // Return the new object structure
        name: data._id,
        series: sortedArray.map((item) => ({
          name: new Date(moment.utc(item.time_stamp).format('MMMM D, YYYY')),
          value: item.percent,
        })),
      },
    ];
  }

  getMemoryChartSeries(data: any) {
    const sortedArray = data.mem_percent.sort((a, b) => {
      return moment(a.time_stamp).diff(b.time_stamp);
    });

    return [
      {
        // Return the new object structure
        name: data._id,
        series: sortedArray.map((item) => ({
          name: new Date(moment.utc(item.time_stamp).format('MMMM D, YYYY')),
          value: item.percent,
        })),
      },
    ];
  }

  // Note:
  // The name represent hostname of container
  // The host represents the Docker Host on which Containers are run,
  // At present Hardcodded as string : DockerHost, once this attribute is included in RRM response.
  // Code will be updated once dockerhost attribute is included.
  getContainerInfo(data: any) {
    return [
      {
        // Return the new object structure
        name: data.hostname,
        ipv4: data.ip,
        uptime: data.uptime,
        host: 'DockerHost',
        lastUpdated: data.lastupdated,
      },
    ];
  }

  secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
}

export interface ContainerData {
  name: string;
  ipv4: string;
  uptime: number;
  host: string;
  lastUpdated: string;
}
