import { Routes } from '@angular/router';
import { SignupComponent } from './Components/sign-up/sign-up';
import { LoginComponent } from './Components/login/login';

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
