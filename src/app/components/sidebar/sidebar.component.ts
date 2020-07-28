import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  toggleClass: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleClass = !this.toggleClass;
  }

}
