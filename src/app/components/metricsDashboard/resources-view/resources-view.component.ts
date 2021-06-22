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

  navigate() {
    this.router.navigateByUrl("/metrics");
  }
  gotoDynamic() {
    //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    this.router.navigateByUrl("/metrics");
  }

  ngOnInit(): void {
    console.log(this.router);
  }

}
