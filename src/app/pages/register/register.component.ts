import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule,],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registerForm!: FormGroup;

  constructor() {
    this.initFormControl();
    this.initFormGroup();
  }

  initFormControl() {
    this.name = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", [Validators.required]);
    this.rePassword = new FormControl("", [Validators.required, this.passwordMatch(this.password)]);
  }

  initFormGroup() {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    })
  }
  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value) {
        return { passNotMatch: true }
      } else return null;
    }
  }

  submit(){
    console.log(this.registerForm.value);
  }




}
