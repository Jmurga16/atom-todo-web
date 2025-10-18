import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
//import { SessionService } from '../services';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {

    const router = inject(Router)
    //const sessionService = inject(SessionService);

    return true;

    /* if (sessionService.isAuthenticated()) {
        return router.navigate(['main/task']);
    }
    else {
        return true
    } */
};
