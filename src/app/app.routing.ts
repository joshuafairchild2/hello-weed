import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookupFormComponent } from './lookup-form/lookup-form.component';
import { StrainDetailsComponent } from './strain-details/strain-details.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LookupFormComponent
  },
  {
    path: 'strains/:ucpc',
    component: StrainDetailsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
