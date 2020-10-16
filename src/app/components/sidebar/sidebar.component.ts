import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  toggleClass: boolean;
  public roles: string[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.roles = this.authService.currentUser.User.roles;
    }
  }

  getRoles() {
    this.roles = this.authService.currentUser.User.roles;
  }
  toggleSidebar() {
    this.toggleClass = !this.toggleClass;
  }
}
