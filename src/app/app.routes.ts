import { Routes } from '@angular/router';
import { SignupComponent } from './components/sign-up/sign-up';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },

    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
    },

    // {
    //     path: '*',
    //     redirectTo: 'login'
    // }


];
