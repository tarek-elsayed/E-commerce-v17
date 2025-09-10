import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { Ilogin } from '../../core/intergaces/http';
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
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username!: FormControl;
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
    this.username = new FormControl('johnd', [Validators.required, ]);
    this.password = new FormControl('m38rmF$', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }
  initFormGroup() {
    this.loginForm = new FormGroup({
      username: this.username,
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
        if (res) {
          this.showToster('success', 'Success', 'Success Login');
          localStorage.setItem('token',res.token);
          this.getUserData()
        }
        this._spinner.hide();
        this._router.navigate(['home'])
      },
      error: (err) => {
        this._spinner.hide();
        this.showToster('error', 'Error', err.error.error);
      },
    });
  }
  getUserData(){
    this._authService.getUserById(1).subscribe((e:any)=>{
      console.log(e);
      localStorage.setItem('username',e.username);
    })
  }


  showToster(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
