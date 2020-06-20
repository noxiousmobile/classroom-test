import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRowComponent } from '../components/class-row/class-row.component';
import { ClassroomSelectorComponent } from '../components/classroom-selector/classroom-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClassRowComponent, ClassroomSelectorComponent],
  exports: [ClassRowComponent, ClassroomSelectorComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
