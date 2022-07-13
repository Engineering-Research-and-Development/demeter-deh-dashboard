import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let drawEntities: any;
declare let resetDymerStart: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  toggleClass: boolean;
  public roles: string[];

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.roles = this.authService.currentUser.User.roles;
    }
  }

  getRoles() {
    this.roles = this.authService.currentUser.User.roles;
  }
  toggleSidebar() {
    this.toggleClass = !this.toggleClass;
  }

  getUserId(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.User.id;
    }
    return '';
  }

  navigateToAllResources() {
    if (this.authService.isExpired()) {
      this.authService.removeToken();
      this.authService.authorize();
    } else {
      this.router.navigateByUrl('', {
        state: { jsonConfig: this.showAllResources() },
      });
    }
  }

  navigateToUserResources() {
    if (this.authService.isExpired()) {
      this.authService.removeToken();
      this.authService.authorize();
    } else {
      this.router.navigateByUrl('', {
        state: { jsonConfig: this.showUserResources() },
      });
    }
  }

  checkRoles() {
    let demeterProvider = false;

    if (this.authService.currentUser) {
      this.authService.currentUser.User.roles.forEach((role) => {
        if (role == 'DEMETER Provider') {
          demeterProvider = true;
        }
      });
    }

    return demeterProvider;
  }
  showUserResources() {
    let userResources = {
      query: {
        query: {
          query: {
            bool: {
              should: [
                {
                  term: {
                    _index: 'dymerservicecomponent',
                  },
                },
                {
                  term: {
                    owner: this.getUserId(),
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

    resetDymerStart();
    drawEntities(userResources);

    return userResources;
  }

  showAllResources() {
    let allResources = {
      query: {
        query: {
          query: {
            bool: {
              should: [
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

    resetDymerStart();
    drawEntities(allResources);

    return allResources;
  }
}
