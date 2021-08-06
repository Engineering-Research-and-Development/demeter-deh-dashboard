import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // isTablet: boolean;

  hideLoginParent: boolean;
  @ViewChild(LoginComponent) private loginComp: LoginComponent;
  @Output() isTablet = new EventEmitter<boolean>();
  clicked: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

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
}
