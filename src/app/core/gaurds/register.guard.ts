import { RegisterComponent } from './../../pages/register/register.component';
import { CanDeactivateFn } from '@angular/router';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.registerForm.valid){
    const alert = window.confirm('your data will be lose');
    return alert;
  }
  return true;

};
