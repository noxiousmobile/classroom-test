import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';

export const routes: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'students', component: StudentsListComponent }
];

