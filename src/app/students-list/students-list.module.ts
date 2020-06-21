import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    SharedModule
  ]
})
export class StudentsListModule { }
