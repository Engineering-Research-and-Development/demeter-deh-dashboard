import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { Component } from '@angular/core';
import { faList, faEraser, faBars, faSearch, faAngleUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  angleUpIcon = faAngleUp;

  constructor(private _modalService: NgbModal){}
  cambia(config) {
    console.log("test");

  }
 

}
