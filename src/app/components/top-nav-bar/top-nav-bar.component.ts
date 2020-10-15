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

  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

  slideLogin() {
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

  test() {
    console.log(this.authService.currentUser);
  }

  logoutClient() {
    console.log('logout client called');
    this.authService.logout().subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  checkDate() {
    this.authService.checkTokenExpiration();
  }
}
