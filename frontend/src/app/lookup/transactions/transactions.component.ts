import {Component, OnDestroy, OnInit} from '@angular/core';
import {LookupService} from "../../services/lookup.service";
import {ActivatedRoute} from "@angular/router";
import {ResolvedAddress} from "../resolvers/address.resolver";
import {Observable, pluck, Subscription} from "rxjs";
import {BscScanTransaction} from "../../dto/BscScan.dto";
import {bnbPrice} from "../../store/misc/misc.effects";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  resolvedAddress: Observable<ResolvedAddress>

  transactions: BscScanTransaction[]

  subscriptions = new Subscription()

  constructor(private route: ActivatedRoute,
              private lookupService: LookupService) {
  }

  ngOnInit() {
    this.resolvedAddress = this.route.data.pipe(pluck('address'))

    this.subscriptions.add(this.resolvedAddress.subscribe(res => {
      this.lookupService.getTransactions(res.address).subscribe(transactions => this.transactions = transactions.result)
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBnbPrice() {
    return bnbPrice
  }

}
