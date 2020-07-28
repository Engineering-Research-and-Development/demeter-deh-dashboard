import { environment } from './../../../environments/environment';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {
  constructor(private _router: Router, public authService: AuthService) { }
  ngOnInit(): void {
  }

  getToken() {
    window.location.href = `http://localhost:3000/oauth2/authorize?response_type=token&client_id=${environment.ID}&state=xyz&redirect_uri=http://localhost:4200/&scope=jwt`;
  }

  openLoginModal() {
    // this._modalService.open(LoginModalComponent, { windowClass: 'modal-holder', centered: true });
  }
  openRegisterUserModal() {
    // this._modalService.open(RegisterModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }

}
