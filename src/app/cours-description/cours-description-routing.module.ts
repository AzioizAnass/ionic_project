import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursDescriptionPage } from './cours-description.page';

const routes: Routes = [
  {
    path: '',
    component: CoursDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursDescriptionPageRoutingModule {}
