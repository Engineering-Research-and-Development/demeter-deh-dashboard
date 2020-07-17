import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
// import * as dymerViewerjs from 'http://dihiwaredym01.eng.it/public/cdn/js/dymer.viewer.js';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  listIcon = faList;

  constructor() { }

  ngOnInit(): void {
    console.log($("#cont-MyList"));
    console.log($("dyemer",));
    
  }





  //  dTagFilter;
  //        d_uid = "10198";
  //        d_gid = "10154";
  //       // this.d_uid = "10198";
  //       // this.d_gid = "10154";

  //        dymerOauthConfig = {
  //           logintype: 'dymer'
  //       };

  //       jsonConfig = {

  //           query: {
  //               "query": {
  //                   "query": {
  //                       "bool": {
  //                           "must": [{
  //                               "term": {
  //                                   "_index": "demeterservicecomponent"
  //                               }
  //                           }]
  //                       }
  //                   }
  //               }
  //           },

  //           endpoint: 'entity.search',
  //           viewtype: 'teaserlist',
  //           target: {
  //               teaserlist: {
  //                   id: "#cont-MyList",
  //                   action: "html",
  //                   reload: false
  //               },
  //               fullcontent: {
  //                   id: "#cont-MyList",
  //                   action: "html"
  //               }
  //           }
  //       };



  //        cambia(jj) {
  //          console.log("okk");
           
  //           var confbase = this.jsonConfig;
  //           // resetDymerStart();
  //           drawEntities(jj);
  //       }
  //      jsonfilter = {
  //           "bool": {
  //               "must": [{
  //                   "match": {
  //                       "_index": "demeterservicecomponent"
  //                   }
  //               }]
  //           }
  //       };

}
