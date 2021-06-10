import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  hideLoginParent: boolean;
  @ViewChild(LoginComponent) private loginComp: LoginComponent;
  @Output() isTablet = new EventEmitter<boolean>();
  clicked: boolean;


  public roles: string[];

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.roles = this.authService.currentUser.User.roles;
    }
  }

  slideLogin() {
    console.log("PARENT", this.loginComp)
    this.loginComp.animateMe();
    this.emitLoginClick();
  }
  emitLoginClick() {
    if (screen.width >= 600 && screen.width <= 768) {
      this.clicked = !this.clicked;
      this.isTablet.emit(this.clicked);
    }
  }

  hideLoginForm($event) {
    this.hideLoginParent = $event;
  }
  logoutClient() {
    this.authService.logout().subscribe((data) => {
      window.location.reload();
    });
  }

  checkDate() {
    this.authService.checkTokenExpiration();
  }

  getRoles() {
    this.roles = this.authService.currentUser.User.roles;
  
  }
}
