import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
  providers: [NgbDropdown]
})
export class FilterBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
