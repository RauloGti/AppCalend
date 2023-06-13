import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignturnPage } from './assignturn.page';

const routes: Routes = [
  {
    path: '',
    component: AssignturnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignturnPageRoutingModule {}
