import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { MetricsService } from 'src/app/services/metrics.service';


@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {

  constructor(private router: Router, private metricsService: MetricsService, public authService: AuthService) { }

  public ownedResources: any;
  public consumedResoruces: any;
  public hasOwnedResources = false;
  public hasConsumedResources = false;

  public kurac: any = undefined;
  public state = '';

  navigate(data) {
    // this.router.navigateByUrl('/123', { state: { hello: 'world' } });
    this.router.navigateByUrl("/metrics", { state: { rrmId: data } });
  }

  navigateToContainer(data) {
    // this.router.navigateByUrl('/123', { state: { hello: 'world' } });
    this.router.navigateByUrl("/metrics-container", { state: { container: data } });
  }


  navigateToExample(data) {
    // this.router.navigateByUrl('/123', { state: { hello: 'world' } });
    this.router.navigateByUrl("/metrics", { state: { resource: data } });
  }


  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('');
    }
    // console.log(this.router);
    this.state = window.history.state.alarm;
    this.getAllMetrics();
  }


  getAllMetrics() {
    this.metricsService.getAllMetrics().subscribe(result => {
      this.ownedResources = result.owned;
      if (this.ownedResources.length > 0) {
        this.hasOwnedResources = true;
      }
      this.consumedResoruces = result.consumed;
      if (this.consumedResoruces.length > 0) {
        this.hasConsumedResources = true;
      }

    })
  }
}
