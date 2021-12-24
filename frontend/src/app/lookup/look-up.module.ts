import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'address/:address',
        pathMatch: 'full',
        children: [
          {
            path: 'transactions'
          }
        ]
      },
      {
        path: 'tx/:txhash'
      }
    ])
  ]
})
export class LookUpModule {
}
