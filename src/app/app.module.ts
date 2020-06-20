import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomSelectorComponent } from './components/classroom-selector/classroom-selector.component';
import { FormsModule } from '@angular/forms';
import { ClassRowComponent } from './components/class-row/class-row.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomSelectorComponent,
    ClassRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
