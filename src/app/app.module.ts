import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LookupFormComponent } from './lookup-form/lookup-form.component';

import { CannabisReportService } from './cannabis-report.service';

@NgModule({
  declarations: [
    AppComponent,
    LookupFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CannabisReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
