import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, public authService: AuthService) { }
  ngOnInit(): void {
    console.log('ex', this.authService.isExpired());

    if (this.authService.isExpired()) {
    this.authService.removeToken();
  }


    if (!localStorage.getItem('token') && localStorage.getItem('token') !== undefined) {
      this._activatedRoute.queryParams.subscribe(params => {
        const token = params['token'];
        const tokenType = params.token_type;

        if (token) {
          this.authService.setToken(token);
        }
      });
    }
  }



}
