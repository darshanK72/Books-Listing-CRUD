import { CanActivateFn } from '@angular/router';

export const afterLoginGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  if (token && user) {
    return true;
  }
  return false;
};
