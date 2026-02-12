import { Routes } from '@angular/router';
import { SignupComponent } from './Components/sign-up/sign-up';
import { LoginComponent } from './Components/login/login';
import { Home } from './Components/Home/home';
import { TaskDetailsPage } from './Components/TaskDetails/task-details-page/task-details-page';
import { CreateTaskPage } from './Components/CreateTask/create-task-page/create-task-page';

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
        path: 'home',
        component: Home,
        title: 'Home'
    },

    {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
    },

    {
        path:'taskDetails/:taskId/:listId',
        component : TaskDetailsPage

    },
    
    {
        path: 'createTask/:id',
        component: CreateTaskPage
    }

];
