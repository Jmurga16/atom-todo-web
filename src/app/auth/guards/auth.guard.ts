import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
//import { SessionService } from '../services';

export const AuthGuard: CanActivateFn = (route, state) => {
    
    const router = inject(Router);
    //const sessionService = inject(SessionService);

    /* if (sessionService.isAuthenticated()) {
        return true;
    } */

    return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
    });
};