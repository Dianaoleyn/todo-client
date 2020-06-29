import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Regr} from '../../common/services/auth/regr.service';
import {AuthForm} from './common/interfaces/auth-form';
import {ApiResponse} from '../../common/services/common/interfaces/api-response.interface';
import {Auth} from '../../common/services/common/interfaces/auth.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public serverMessage: string = '';

  public form: FormGroup = new FormGroup({
    'login': new FormControl(''),
    'state': new FormControl(false)
  });

  public get state(): boolean {
    return this.form.get('state').value;
  }

  public get loginErrorMessage(): string {
    const control: AbstractControl = this.form.get('login');
    return control.hasError('required') ?
      'Логин не может быть пуст!' :
      control.hasError('pattern') ?
      'Логин содержит только английские буквы и цифры!' :
      control.hasError('minlength') ?
      'Логин не может быть меньше 6 символов!' :
      control.hasError('server') ?
      this.serverMessage : '';
  }

  constructor(
    private regr: Regr,
    private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this.form.get('state').valueChanges.subscribe(() => this.form.get('login').updateValueAndValidity());
  }

  public auth(): void {
    const formData: AuthForm = this.form.value;

    const redirect: any = (response: ApiResponse<Auth>) => {
      if (!response.success) {
        this.serverMessage = response.reason;
        this.form.get('login').setErrors({server: this.serverMessage});
      } else {
        this._router.navigate(['/main']);
      }
    };

    if (formData.state) {
      this.regr.authentication(formData.login).then(redirect);
    } else {
      this.regr.identity(formData.login).then(redirect);
    }
  }

}
