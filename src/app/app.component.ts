import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, public authService: AuthService) { }
  ngOnInit(): void {

    if (!localStorage.getItem("token") && localStorage.getItem("token") !== undefined) {
      this._activatedRoute.queryParams.subscribe(params => {
        let token = params["token"];
        const tokenType = params['token_type'];

        if(token)
        this.authService.setToken(token);
      });
    }
  }



}
