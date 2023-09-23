import { CanActivateFn } from '@angular/router';

export const beforeLoginGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  if (token && user) {
    return false;
  }
  return true;
};
