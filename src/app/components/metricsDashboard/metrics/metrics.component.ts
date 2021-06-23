import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
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
  // styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  containerMetrics: metricsContainer;
  metrcisByRrm: metricsData;
  allMetricsData: metricsData;

  multi: any[];
  view: any[] = [700, 400];

  // Color scheme to be used for cpu & memory utilization monitoring graphs.
  colorscheme = [ '#4DD0E1', '#BA68C8', '#FF7043', '#0dfcd8', '#daa70a', '#e81e74', '#ab81c3', '#95f3f5','#4be39a','#0d439b', '#8fa618' ]

  displayedColumns: string[] = ['name', 'ipv4', 'uptime', 'host'];
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
  xAxisLabel: string = 'Day';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Utilization';
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

    cpu_res: any;
    mem_res: any;
    CONTAINERS_DATA: any;

    public state = '';


    ngOnInit(): void {
      
      // rrmId
      this.state = window.history.state.rrmId;
      console.log("STATE", this.state)
      console.log(JSON.stringify(this.state));
    
      this.getMetricsByRrmId(this.state);

      console.log("Metrics by RRM", this.metrcisByRrm)
      

      // // Simulate api call - real world
      // of(this.CONTAINERS_DATA).pipe(delay(1250)).subscribe(x => {
      // this.dataSource.data = this.CONTAINERS_DATA
      // })

      //  this.cpu_res = rrm_single.containers.map(container => {
      //   return {
      //     // Return the new object structure
      //     name: container._id,
      //     series: container.cpu_percent.map(item => ({
      //       name: item.time_stamp,
      //       value: item.percent
      //     }))
      //   };
      // });
  
      // this.mem_res = rrm_single.containers.map(container => {
      //   return {
      //     // Return the new object structure
      //     name: container._id,
      //     series: container.mem_percent.map(item => ({
      //       name: item.time_stamp,
      //       value: item.percent
      //     }))
      //   };
      // });

    
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

      console.log("Metrics by rrm: ", this.metrcisByRrm)
      console.log("Series by rrm CPU", this.getCpuChartSeries(this.metrcisByRrm))
      console.log("Series by rrm memory", this.getMemoryChartSeries(this.metrcisByRrm))

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

  getCpuChartSeries(metricsData: metricsData){

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

  getMemoryChartSeries(metricsData: metricsData){

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
  getContainerInfo(metricsData: metricsData){

    return metricsData.containers.map(container => {
      return {
        // Return the new object structure
        name: container.hostname,
        ipv4: container.ip,
        uptime: container.uptime,
        host:"DockerHost"
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
// const CONTAINERS_DATA: ContainerData[] = [
//   { name: 'Container1', ipv4: '10.10.10.11', uptime: 240, host: 'host1'},
//   {  name: 'Container2', ipv4: '10.10.10.12', uptime: 220, host: 'host1'},
//   {  name: 'Container3', ipv4: '10.10.10.13', uptime: 100, host: 'host1'},
//   {  name: 'Container4', ipv4: '10.10.10.14', uptime: 150, host: 'host1'},
//   { name: 'Container5', ipv4: '10.10.10.15', uptime: 120, host: 'host1'},
//   {  name: 'Container6', ipv4: '10.10.10.16', uptime: 130, host: 'host1'},
//   { name: 'Container7', ipv4: '10.10.10.17', uptime: 110, host: 'host1'},
//   { name: 'Container8', ipv4: '10.10.10.11', uptime: 240, host: 'host1'},
//   { name: 'Container9', ipv4: '10.10.10.12', uptime: 220, host: 'host1'},
//   { name: 'Container10', ipv4: '10.10.10.13', uptime: 100, host: 'host1'},
//   { name: 'Container11', ipv4: '10.10.10.14', uptime: 150, host: 'host1'},
//   {  name: 'Container12', ipv4: '10.10.10.15', uptime: 120, host: 'host1'},
//   { name: 'Container13', ipv4: '10.10.10.16', uptime: 130, host: 'host1'},
//   { name: 'Container14', ipv4: '10.10.10.17', uptime: 110, host: 'host1'},
//   { name: 'Container15', ipv4: '10.10.10.11', uptime: 240, host: 'host1'},
//   { name: 'Container16', ipv4: '10.10.10.12', uptime: 220, host: 'host1'},
//   { name: 'Container17', ipv4: '10.10.10.13', uptime: 100, host: 'host1'},
//   {name: 'Container18', ipv4: '10.10.10.14', uptime: 150, host: 'host1'},
//   {  name: 'Container19', ipv4: '10.10.10.15', uptime: 120, host: 'host1'},
//   { name: 'Container20', ipv4: '10.10.10.16', uptime: 130, host: 'host1'},
//   {  name: 'Container21', ipv4: '10.10.10.17', uptime: 110, host: 'host1'}
//   ];
  
// const CONTAINERS_DATA: ContainerData[]  = this.getContainerInfo(rrm_single)