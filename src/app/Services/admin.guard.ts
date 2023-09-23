import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  if (token && user) {
   let userData =  JSON.parse(user);
   if(userData.role == 'admin'){
    return true;
   }
   else return false;
  }
  return false;
};
