import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { Ilogin } from '../../core/intergaces/iregister';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/moduls/shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [
    SharedModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this.initFormControl();
    this.initFormGroup();
  }

  initFormControl() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }
  initFormGroup() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  submit() {
    if (this.loginForm.valid) {
      this.singIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) => {
        this.loginForm.controls[control].markAsDirty();
      });
    }
  }
  singIn(data: Ilogin) {
    this._spinner.show();
    this._authService.login(data).subscribe({
      next: (res) => {
        if (res._id) {
          console.log(res);

          this.showToster('success', 'Success', 'Success Login');
        }
        this._spinner.hide();
        this._router.navigate(['user'])
      },
      error: (err) => {
        this._spinner.hide();
        this.showToster('error', 'Error', err.error.error);
      },
    });
  }


  showToster(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
