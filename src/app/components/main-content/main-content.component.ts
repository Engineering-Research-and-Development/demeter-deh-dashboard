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
  constructor() {}

  ngOnInit(): void {
    console.log('dyerm', );
    this.callDymer();
    // this.cambia(this.jsonConfig);
    // this.callDymer();
  }

  

  callDymer() {
    mainDymerView();
    
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
  cambia2(jj: any) {
    var confbase = this.jsonConfig;
    resetDymerStart();
    drawEntities(jj);
  }
}
