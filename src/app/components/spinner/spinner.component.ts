import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(
    private _spinnerService: SpinnerService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._spinnerService.getSpinnerObservable().subscribe((status) => {
      this.showSpinner = status === true;
      this._cdRef.detectChanges();
    });
  }
}
