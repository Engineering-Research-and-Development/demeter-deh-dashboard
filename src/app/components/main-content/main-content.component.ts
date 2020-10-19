import { Component, OnInit } from '@angular/core';
declare let drawEntities: any;
declare let resetDymerStart: any;
declare let dymerscript: any;
declare let mainDymerView: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.callDymer();

    this.showLocation();
  }

  callDymer() {
    mainDymerView();
  }

  showLocation() {

    let options = {
      enableHighAccuracy: true,
    };

    function success(position) {
      let crd = position.coords;
    }

    function error(err) {
      alert('Please allow Geolocation to use Search by distance');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  jsonConfig = {
    query: {
      query: {
        query: {
          bool: {
            must: [
              {
                term: {
                  _index: 'dymerservicecomponent',
                },
              },
            ],
          },
        },
      },
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
    var confbase = this.jsonConfig;
    resetDymerStart();
    drawEntities(jj);
    // window.location.reload();
  }
}
