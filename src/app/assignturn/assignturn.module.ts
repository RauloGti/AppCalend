import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignturnPageRoutingModule } from './assignturn-routing.module';

import { AssignturnPage } from './assignturn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignturnPageRoutingModule
  ],
  declarations: [AssignturnPage]
})
export class AssignturnPageModule {}
