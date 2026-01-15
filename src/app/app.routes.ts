import { Routes } from '@angular/router';
import { TaskDetailsPage } from './components/taskDetails/task-details-page/task-details-page';

export const routes: Routes = [
    {
        path: 'taskDetails/:taskId',
        component: TaskDetailsPage
    }
];
