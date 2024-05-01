import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
    
      return true;
    }else{
     this.router.navigate(['/login'])
     return false
    }
   
  }
}
