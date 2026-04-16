import { CanActivateFn , Router } from '@angular/router';
import { RequestHelperService } from './Services/BaseService/request-helper-service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
     const auth = inject(RequestHelperService);
  const router = inject(Router);

  if (!auth.GetUserIdToken()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
