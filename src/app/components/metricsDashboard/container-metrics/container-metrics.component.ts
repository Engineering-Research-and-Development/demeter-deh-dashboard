import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MetricsService } from '../../../services/metrics.service'
import { metricsContainer } from '../../../models/metricsContainer'
import { metricsData } from '../../../models/metricsData'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container-metrics',
  templateUrl: './container-metrics.component.html',
  styleUrls: ['./container-metrics.component.css']
})
export class ContainerMetricsComponent implements OnInit {
  containerMetrics: any;
  metrcisByRrm: metricsData;


  cpu_res: any;
  mem_res: any;
  CONTAINERS_DATA: any;

  public state: any;
  multi: any[];
  view: any[] = [700, 400];

  // Color scheme to be used for cpu & memory utilization monitoring graphs.
  colorscheme = [
    '#4DD0E1', '#A84DE1', '#E15E4D', '#86E14D', '#FFFD43', '#FF9F43', '#E81E74', '#AB81C3', '#95F3F5', '#4BE39A', '#0D439B', '#8FA618'
  ]
  displayedColumns: string[] = ['containerName', 'ipv4', 'uptime', 'host'];
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
    public activatedRoute: ActivatedRoute, public authService: AuthService, private router: Router
  ) {
  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }


  ngOnInit(): void {

    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('');
    }
    // rrmId
    this.state = window.history.state.container;
    this.containerMetrics = this.state;
    this.proba(this.containerMetrics)
    // this.getMetricsByRrmId(this.state);
  }



  axisDigits(val: any): any {
    return new DatePipe('en').transform(val);
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val);
  }



  proba(data: any) {

    this.CONTAINERS_DATA = this.getContainerInfo(data)
    this.dataSource.data = this.CONTAINERS_DATA
    this.cpu_res = this.getCpuChartSeries(data)
    this.mem_res = this.getMemoryChartSeries(data)

  }


  getCpuChartSeries(data: any) {

    return [{
      // Return the new object structure
      name: data._id,
      series: data.cpu_percent.map(item => ({
        name: item.time_stamp,
        value: item.percent
      }))
    }];
  }

  getMemoryChartSeries(data: any) {

    return [{
      // Return the new object structure
      name: data._id,
      series: data.cpu_percent.map(item => ({
        name: item.time_stamp,
        value: item.percent
      }))
    }];
  }

  // Note: 
  // The name represent hostname of container
  // The host represents the Docker Host on which Containers are run,
  // At present Hardcodded as string : DockerHost, once this attribute is included in RRM response.
  // Code will be updated once dockerhost attribute is included.
  getContainerInfo(data: any) {


    return [{
      // Return the new object structure
      name: data.hostname,
      ipv4: data.ip,
      uptime: data.uptime,
      host: "DockerHost",

    }];
  }
}

export interface ContainerData {
  name: string;
  ipv4: string;
  uptime: number;
  host: string;
}