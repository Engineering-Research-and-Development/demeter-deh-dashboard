import { Component, OnInit } from '@angular/core';
declare let drawEntities: any;
declare let resetDymerStart: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    this.cambia(this.jsonConfig);
  }



  jsonConfig = {

    query: {
      "query": {
        "query": {
          "bool": {
            "must": [{
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
        id: "#cont-MyList",
        action: "html",
        reload: false
      },
      fullcontent: {
        id: "#cont-MyList",
        action: "html"
      }
    }
  };


  cambia(jj: any) {
    var confbase = this.jsonConfig;
    resetDymerStart();
    drawEntities(jj);
  }

  cambia2(jj: any) {
    var confbase = this.jsonConfig;
    resetDymerStart();
    drawEntities(jj);
    window.location.reload();
  }


}
