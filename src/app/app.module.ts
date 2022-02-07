import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MetricsComponent } from './components/metricsDashboard/metrics/metrics.component';
import { ContainerMetricsComponent } from './components/metricsDashboard/container-metrics/container-metrics.component';
import { ResourcesViewComponent } from './components/metricsDashboard/resources-view/resources-view.component';
import { MaterialModule } from './material.module'
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'metrics', component: MetricsComponent, canActivate: [AuthGuardService] },
  { path: 'metrics-container', component: ContainerMetricsComponent, canActivate: [AuthGuardService] },
  { path: 'user-metrics', component: ResourcesViewComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FilterBarComponent,
    MainContentComponent,
    TopNavBarComponent,
    FooterComponent,
    LoginComponent,
    SpinnerComponent,
    AboutComponent,
    HomeComponent,
    MetricsComponent,
    ResourcesViewComponent,
    ContainerMetricsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
