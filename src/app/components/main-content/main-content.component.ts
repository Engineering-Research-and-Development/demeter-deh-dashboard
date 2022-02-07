import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
declare let drawEntities: any;
declare let resetDymerStart: any;
declare let mainDymerView: any;
declare let getResourcesRefresh: any;


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isExpired()) {
      this.authService.removeToken();
      this.authService.removeCapToken();
      this.router.navigateByUrl('');
    }

    if (this.authService.currentUser) {
      if (!localStorage.getItem("logged")) {
        this.callDymer();
      }
      if (window.history.state.jsonConfig != undefined) {
        getResourcesRefresh(window.history.state.jsonConfig);
      }
    }
    this.showLocation();
  }


  callDymer() {
    mainDymerView();
    localStorage.setItem("logged", "true");
  }

  showLocation() {

    let options = {
      enableHighAccuracy: true,
    };

    function success(position) {
      let coordinates = position.coords.latitude + ',' + position.coords.longitude;
      localStorage.setItem('userLocation', coordinates);
    }

    function error(err) {
      alert('Please allow Geolocation to use Search by distance');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  jsonConfig = {
    "query": {
      "query": {
        "query": {
          "bool": {
            "should": [{
              "term": {
                "_index": "dymerservicecomponent"
              }
            }]
          }
        }
      }
    },

    endpoint: 'entity.search',
    viewtype: 'teaserlist',
    target: {
      teaserlist: {
        id: '#cont-MyList',
        action: 'html',
        reload: false,
      },
      fullcontent: {
        id: '#cont-MyList',
        action: 'html',
      },
    },
  };

  cambia(jj: any) {
    resetDymerStart();
    drawEntities(jj);
  }

  showAllResources() {
    let test = {
      "query": {
        "query": {
          "query": {
            "bool": {
              "should": [{
                "term": {
                  "_index": "dymerservicecomponent"
                }
              }
              ]
            }
          }
        }
      },

      endpoint: 'entity.search',
      viewtype: 'teaserlist',
      target: {
        teaserlist: {
          id: '#cont-MyList',
          action: 'html',
          reload: false,
        },
        fullcontent: {
          id: '#cont-MyList',
          action: 'html',
        },
      },
    };

    resetDymerStart();
    drawEntities(test);

  }
}
