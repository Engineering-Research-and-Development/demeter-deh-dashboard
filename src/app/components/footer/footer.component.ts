import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private _modalService: NgbModal) { }
  ngOnInit(): void {
  }
  // openDymerLoginModal() {
  //   this._modalService.open(LoginModalComponent, { windowClass: 'modal-holder', centered: true });
  // }

  

}
