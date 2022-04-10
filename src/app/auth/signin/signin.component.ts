import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthService } from '../auth.service';
import { AsyncService } from '../../shared/services/async.service';
import { CommonService } from '../../shared/services/common.service';
import { Login } from '../actions/auth.actions';

@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  formId = 'loginForm';
  form: FormGroup;
  loginedsub: Subscription;
  birthDay: string;
  authSub: Subscription;
  private formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private commonService: CommonService,
    public asyncService: AsyncService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    });
  }

  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }

  onLogin(values: any) {
    const defaultObj = {
      isAuthenticated: true,
      userInformation: {
        username: this.userName.value,
        cellNo: '01666666666',
        email: 'admin007@gmail.com',
        category: 'superAdmin',
      },
    };
    if (this.form.valid) {
      this.asyncService.start();
      this.commonService.removeEmptyProperties(values);
      this.store.dispatch(new Login(defaultObj));
      this.router.navigate(['/']);
      this.asyncService.finish();
    }
  }

  ngOnDestroy(): void {
    if (this.loginedsub) {
      this.loginedsub.unsubscribe();
    }
    this.asyncService.finish();
  }
}
