import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMetricsComponent } from './container-metrics.component';

describe('ContainerMetricsComponent', () => {
  let component: ContainerMetricsComponent;
  let fixture: ComponentFixture<ContainerMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerMetricsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
