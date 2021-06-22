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

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor(private metricsService: MetricsService) {
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
    res: any;
    res_cards: any;
    CONTAINERS_DATA: any;


    ngOnInit(): void {
      this.CONTAINERS_DATA = this.getContainerInfo(rrm_single)
      console.log(this.CONTAINERS_DATA);

      // Simulate api call
      of(this.CONTAINERS_DATA).pipe(delay(1250)).subscribe(x => {
      this.dataSource.data = this.CONTAINERS_DATA
      })

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

      this.cpu_res = this.getCpuChartSeries(rrm_single)
      this.mem_res = this.getCpuChartSeries(rrm_single)

      

      this.res_cards = rrm_single.containers.map(container => {
        return {
          // Return the new object structure
          name: container._id,
          series: container.cpu_percent.map(item => ({
            name: item.time_stamp,
            value: item.percent
          }))
        };
      });
  
  
      console.log(this.cpu_res);
      console.log(this.mem_res);
    }


    axisDigits(val: any): any {
      return new DatePipe('en').transform(val);
    }
  
    axisDate(val: string): string {
      return new DatePipe('en').transform(val);
    }

  getAllMetrics() {

    this.metricsService.getAllMetrics().subscribe(result => {

      this.metricsService.getAllMetrics().subscribe(result => {
        this.allMetricsData = result

        console.log("All metrics: ", this.allMetricsData)

      })
    }
    )

  }

  getMetricsByRrmId(rrmId: string) {
    this.metricsService.getMetricsByRrmId(rrmId).subscribe(result => {
      this.metrcisByRrm = result;

      console.log("Metrics by rrm: ", this.metrcisByRrm)
      console.log("Series by rrm CPU", this.getCpuChartSeries(this.metrcisByRrm))
      console.log("Series by rrm memory", this.getMemoryChartSeries(this.metrcisByRrm))

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