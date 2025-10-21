import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.routes').then(m => m.routes)
    },
    {
        path: 'main',
        loadChildren: () =>
            import('./modules/main.routes').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
