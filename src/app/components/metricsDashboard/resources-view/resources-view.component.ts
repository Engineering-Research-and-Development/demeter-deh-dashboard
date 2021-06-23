import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from "@angular/router";
import { MetricsService } from 'src/app/services/metrics.service';
import { rrm_multiple, rrm_single, multi } from '../../data_rrm';


@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {

  constructor(private router: Router, private metricsService: MetricsService) { }

  public members: any;

  public state = '';

  navigate(data) {
    console.log("DATA TO PASS", JSON.stringify(data));
    // this.router.navigateByUrl('/123', { state: { hello: 'world' } });
    this.router.navigateByUrl("/metrics", { state: { rrmId: data } });
  }

  ngOnInit(): void {
    // console.log(this.router);
    this.state = window.history.state.alarm;
    this.getAllMetrics();
    console.log(this.state);
  }


  getAllMetrics() {
    this.metricsService.getAllMetrics().subscribe(result => {
      this.members = result
      console.log("All metrics: ", this.members)
    })
  }
}
