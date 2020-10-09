import {
  Component,
  DoBootstrap,
  ElementRef,
  EventEmitter,
  Input,
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
  toggleSlide: boolean;

  @ViewChild(LoginComponent) private loginComp: LoginComponent;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

  slideLogin() {
    this.loginComp.animateMe();

  
    // this.toggleSlide = !this.toggleSlide;
    // console.log(this.toggleSlide);
  }

  test(){
    console.log(this.authService.currentUser);
  }
}
