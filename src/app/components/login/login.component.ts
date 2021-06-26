import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare let mainDymerView: any;
declare let resetDymerStart: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideLogin', [
      state('small', style({ top: '-60px' })),
      state('large', style({ top: '14px' })),
      transition('small <=> large', animate('200ms ease-in')),
    ]),
    trigger('slideLoginMobile', [
      state('small', style({ top: '-210px' })),
      state('large', style({ top: '190px' })),
      transition('small <=> large', animate('100ms ease-in')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  @Output() hideLogin = new EventEmitter<boolean>();
  state: string = 'small';
  loginForm: FormGroup;
  success: boolean;
  errorMessage: string;
  isMobile: boolean = false;

  animateMe() {
    this.state = this.state === 'small' ? 'large' : 'small';
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }

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

  login() {
    if (this.loginForm.invalid) return;

    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.password;

    this._authService.login(email, password).subscribe((res) => {
      if (!res.success) {
        this.success = false;
        this.errorMessage = res.message;
      } else {
        this.success = true;
        this.hideLogin.emit(true);
        resetDymerStart();
        this._router.navigateByUrl('/');
      }
    });
  }

  callDymer() {
    mainDymerView();
  }
}
