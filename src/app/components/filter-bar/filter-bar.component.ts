import { Component, OnInit } from '@angular/core';
import { faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  searchIcon = faSearch;
  eraserIcon = faEraser;


  constructor() { }

  ngOnInit(): void {
  }

}
