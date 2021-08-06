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
import * as moment from 'moment';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  containerMetrics: metricsContainer;
  metrcisByRrm: metricsData;

  cpu_res: any;
  mem_res: any;
  CONTAINERS_DATA: any;

  public state = '';
  multi: any[];
  view: any[] = [700, 400];

  // Color scheme to be used for cpu & memory utilization monitoring graphs.
  colorscheme = [
    '#4DD0E1', '#A84DE1', '#E15E4D', '#86E14D', '#FFFD43', '#FF9F43', '#E81E74', '#AB81C3', '#95F3F5', '#4BE39A', '#0D439B', '#8FA618'
  ]

  displayedColumns: string[] = ['containerName', 'ipv4', 'uptime', 'host', 'consumer'];
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


  constructor(private metricsService: MetricsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
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
    this.state = window.history.state.rrmId;
    this.getMetricsByRrmId(this.state);
  }


  axisDigits(val: any): any {
    return new DatePipe('en').transform(val);
  }

  axisDate(val: any): any {

    return new DatePipe('en').transform(val);
  }



  getMetricsByRrmId(rrmId: string) {
    this.metricsService.getMetricsByRrmId(rrmId).subscribe(result => {
      this.metrcisByRrm = result;

      this.CONTAINERS_DATA = this.getContainerInfo(this.metrcisByRrm)
      this.dataSource.data = this.CONTAINERS_DATA
      this.cpu_res = this.getCpuChartSeries(this.metrcisByRrm)
      this.mem_res = this.getMemoryChartSeries(this.metrcisByRrm)

    })
  }

  getMetricsByContainerId(containerId: string) {
    this.metricsService.getMetricsByContainerId(containerId).subscribe(result => {
      this.containerMetrics = result;
    })
  }


  getCpuChartSeries(metricsData: metricsData) {


    return metricsData.containers.map(container => {


      const sortedArray = container.cpu_percent.sort((a, b) => {
        return moment(a.time_stamp).diff(b.time_stamp);
      });


      return {
        // Return the new object structure

        name: container._id,
        series: sortedArray.map(item => ({
          name: moment.utc(item.time_stamp).format('MMMM D, YYYY'),
          value: item.percent
        }))
      };
    });
  }


  getMemoryChartSeries(metricsData: metricsData) {

    return metricsData.containers.map(container => {

      const sortedArray = container.mem_percent.sort((a, b) => {
        return moment(a.time_stamp).diff(b.time_stamp);
      });

      return {
        // Return the new object structure
        name: container._id,
        series: sortedArray.map(item => ({
          name: moment.utc(item.time_stamp).format('MMMM D, YYYY'),
          value: item.percent
        }))
      };
    });
  }

  // Note: 
  // The name represent hostname of container
  // The host represents the Docker Host on which Containers are run,
  // At present Hardcodded as string : DockerHost, once this attribute is included in RRM response.
  // Code will be updated once dockerhost attribute is included.
  getContainerInfo(metricsData: metricsData) {

    return metricsData.containers.map(container => {
      return {
        // Return the new object structure
        name: container.hostname,
        ipv4: container.ip,
        uptime: container.uptime,
        host: "DockerHost",
        consumerUsername: container.consumer.username,
        consumerEmail: container.consumer.email

      };
    });
  }
}

export interface ContainerData {
  name: string;
  ipv4: string;
  uptime: number;
  host: string;
  consumerUsername: string;
  consumerEmail: string;
}