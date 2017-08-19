import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LookupFormComponent } from './lookup-form/lookup-form.component';

import { CannabisReportService } from './services/cannabis-report.service';
import { StrainDetailsComponent } from './strain-details/strain-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LookupFormComponent,
    StrainDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [CannabisReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
