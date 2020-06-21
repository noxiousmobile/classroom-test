import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';


@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    StudentsListRoutingModule
  ]
})
export class StudentsListModule { }
