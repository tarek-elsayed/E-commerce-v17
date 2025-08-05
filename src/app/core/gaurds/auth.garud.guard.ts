import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const authGarud: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(AuthService);
  if (auth.authrized())
    return true;
  else {
    // router.navigate(['login'])
    return router.createUrlTree(['login'])
  }
};
