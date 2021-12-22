import {Component, OnInit} from '@angular/core';
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {selector_selectedWallet} from "../../store/wallet/wallet.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  $selectedWallet: Observable<IWallet | null>

  transfer_from: IWallet | null
  transfer_to: IWallet | null
  transfer_value: number;

  constructor(private store: Store<WalletStore>) {
  }

  ngOnInit() {
    this.$selectedWallet = this.store.select(selector_selectedWallet)
  }

  fromSelected($event: IWallet | null) {
    this.transfer_from = $event
  }

  toSelected($event: IWallet | null) {
    this.transfer_to = $event
  }
}
