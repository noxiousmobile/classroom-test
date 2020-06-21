import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ManageStudentsComponent } from './students-list/components/manage-students/manage-students.component';
import { MatInputModule, MatButtonModule, MatTableModule, MatDialogModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    ManageStudentsComponent
  ],
  entryComponents: [ManageStudentsComponent],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
