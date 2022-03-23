import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap'
declare var $: any;

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
  providers: [NgbDropdown, DatePipe]
})
export class FilterBarComponent implements OnInit {

  pageSize: number;
  createdFromInput
  lastUpdateFromInput;
  todaysDate;

  constructor(private datePipe: DatePipe) {
    this.todaysDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {

    this.pageSize = 3;
  }

  clear() {
    (<HTMLFormElement>document.getElementById("myfilter")).reset();
    $('.selectpicker').selectpicker('refresh');
  }
}
