import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight, faSeedling, faSitemap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  toggleClass: boolean;
  angleLeftIcon = faAngleLeft;
  angleRightIcon = faAngleRight;
  seedlingIcon = faSeedling;
  sitemapIcon = faSitemap;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleClass = !this.toggleClass;
  }

}
