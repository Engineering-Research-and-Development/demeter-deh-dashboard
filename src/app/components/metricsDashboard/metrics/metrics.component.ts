import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MetricsService } from '../../../services/metrics.service'
import { metricsContainer } from '../../../models/metricsContainer'
import { metricsData } from '../../../models/metricsData'
import { rrm_multiple, rrm_single, multi } from '../../data_rrm';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

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
  colorscheme = ['#4DD0E1', '#BA68C8', '#FF7043', '#0dfcd8', '#daa70a', '#e81e74', '#ab81c3', '#95f3f5', '#4be39a', '#0d439b', '#8fa618']

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


  constructor(private metricsService: MetricsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  ngOnInit(): void {

    // rrmId
    this.state = window.history.state.rrmId;
    this.getMetricsByRrmId(this.state);
  }


  axisDigits(val: any): any {
    return new DatePipe('en').transform(val);
  }

  axisDate(val: string): string {
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

  getMetricsByContainerId(rrmId: string) {
    this.metricsService.getMetricsByContainerId(rrmId).subscribe(result => {
      this.containerMetrics = result;

      console.log("Metrics by container: ", this.containerMetrics)


    })
  }

  getCpuChartSeries(metricsData: metricsData) {

    return metricsData.containers.map(container => {
      return {
        // Return the new object structure
        name: container._id,
        series: container.cpu_percent.map(item => ({
          name: item.time_stamp,
          value: item.percent
        }))
      };
    });
  }

  getMemoryChartSeries(metricsData: metricsData) {

    return metricsData.containers.map(container => {
      return {
        // Return the new object structure
        name: container._id,
        series: container.mem_percent.map(item => ({
          name: item.time_stamp,
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
        host: "DockerHost"
      };
    });
  }
}

export interface ContainerData {
  name: string;
  ipv4: string;
  uptime: number;
  host: string;
}