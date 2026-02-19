import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';


export const adminGuard: CanActivateFn = () => {
  // if (typeof window === 'undefined') return false;

  // return !!localStorage.getItem('adminToken');

  //   if (!localStorage.getItem('adminToken')) {
  //     return false;
  //   } else {
  // };
  const router = inject(Router);
  if (typeof window === 'undefined') return false; // SSR: no localStorage
  const token = localStorage.getItem('adminToken');
  if (token) return true;
  router.navigate(['/admin/login']);
  return false;
};