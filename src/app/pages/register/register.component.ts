import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { Iregister } from '../../core/intergaces/iregister';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/moduls/shared/shared.module';
@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,

})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registerForm!: FormGroup;
  messages!: Message[];

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this.initFormControl();
    this.initFormGroup();
  }

  ngOnInit() {
    this.messages = [{ severity: 'info', detail: 'Message Content' }];
  }
  initFormControl() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.rePassword = new FormControl('', [
      Validators.required,
      this.passwordMatch(this.password),
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  initFormGroup() {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    });
  }
  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value) {
        return { passNotMatch: true };
      } else return null;
    };
  }

  submit() {
    if (this.registerForm.valid) {
      this.singUp(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
      Object.keys(this.registerForm.controls).forEach((control) => {
        this.registerForm.controls[control].markAsDirty();
      });
    }
  }

  singUp(data: Iregister) {
    this._spinner.show();
    this._authService.register(data).subscribe({
      next: (res) => {
        this._spinner.hide();
        if (res._id) {
          this.showToster('success', 'Success', 'Success Register');
          const { email, password } = data;
          this._authService.login({ email, password }).subscribe((next) => {
            localStorage.setItem('token',res._id)
            this._router.navigate(['user'])
          })
        }
        this._spinner.hide();
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
