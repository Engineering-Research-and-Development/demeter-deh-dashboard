import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {
  ngOnInit(): void {
  }
  openLoginModal() {
    // this._modalService.open(LoginModalComponent, { windowClass: 'modal-holder', centered: true });
  }
  openRegisterUserModal() {
    // this._modalService.open(RegisterModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }

}
