import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideLogin', [
      state('small', style({ top: '-42px' })),
      state('large', style({ top: '14px' })),
      transition('small <=> large', animate('200ms ease-in')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  state: string = 'small';
  loginForm: FormGroup;

  animateMe() {
    this.state = this.state === 'small' ? 'large' : 'small';
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
