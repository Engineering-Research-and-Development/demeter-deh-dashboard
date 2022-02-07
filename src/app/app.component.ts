import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }
  ngOnInit(): void {
    if (this.authService.isExpired()) {
      this.authService.removeToken();
      this.authService.removeCapToken();
    }

    if (
      !localStorage.getItem('DYM') &&
      localStorage.getItem('DYM') !== undefined
    ) {
      this._activatedRoute.queryParams.subscribe((params) => {
        const token = params['DYM'];
        const tokenType = params.token_type;

        if (token) {
          this.authService.setToken(token);
        }
      });
    }
  }
}
