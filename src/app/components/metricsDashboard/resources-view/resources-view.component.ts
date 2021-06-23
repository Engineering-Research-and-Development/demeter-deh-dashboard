import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from "@angular/router";
import { rrm_multiple, rrm_single, multi } from '../../data_rrm';


@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {

  constructor(private router: Router) { }

  public members: any = rrm_multiple

  public state = '';

  navigate(data) {
    console.log(JSON.stringify(data));
    // this.router.navigateByUrl('/123', { state: { hello: 'world' } });
    this.router.navigateByUrl("/metrics", { state: { rrmId: data } });
  }

  ngOnInit(): void {
    // console.log(this.router);
    this.state = window.history.state.alarm;
    console.log(this.state);
  }

}
