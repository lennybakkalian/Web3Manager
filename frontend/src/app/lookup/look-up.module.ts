import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TransactionsComponent} from './transactions/transactions.component';
import {AddressResolver} from "./resolvers/address.resolver";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'address/:address',
        resolve: {
          address: AddressResolver
        },
        children: [
          {
            path: 'transactions',
            component: TransactionsComponent
          }
        ]
      },
      {
        path: 'tx/:txhash'
      }
    ]),
    CardModule,
    ButtonModule,
    RippleModule,
    TooltipModule
  ]
})
export class LookUpModule {
}
