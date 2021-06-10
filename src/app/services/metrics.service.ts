import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Response} from './../models/response'

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  url = `${environment.DYMER_URL}/api/metrics`;

  constructor(private _http: HttpClient, private authService: AuthService) { }


  getAllMetrics(){

    let accessToken = this.authService.currentUser.access_token;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-subject-token': accessToken
    };

    return this._http.get<Response>(this.url, { headers }).pipe(
      map((resp) => {
        if (!resp.success) {
          return resp.message;
        }
        
        return resp.data;
      })
    );
  }
  

  getMetricsByRrmId(rrmId: String){

    let accessToken = this.authService.currentUser.access_token;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-subject-token': accessToken
    };

    return this._http.get<Response>(this.url + "/rrmid/" + rrmId, { headers }).pipe(
      map((resp) => {
        if (!resp.success) {
          return resp.message;
        }

        return resp.data;
      })
    );
  }
  
  getMetricsByContainerId(containerId: String){

    let accessToken = this.authService.currentUser.access_token;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-subject-token': accessToken
    };

    return this._http.get<Response>(this.url + "/containerid/" + containerId, { headers }).pipe(
      map((resp) => {
        if (!resp.success) {
          return resp.message;
        }

        return resp.data;
      })
    );
  }

}
