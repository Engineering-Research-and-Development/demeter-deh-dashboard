import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../services/metrics.service'
import { metricsContainer } from '../../models/metricsContainer'
import { metricsData } from '../../models/metricsData'

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  containerMetrics: metricsContainer;
  metrcisByRrm: metricsData;
  allMetricsData: metricsData;
  constructor(private metricsService: MetricsService) { }


  ngOnInit(): void {
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

  
}
