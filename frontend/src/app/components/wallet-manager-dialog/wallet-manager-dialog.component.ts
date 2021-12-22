import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {IWallet} from "@shared";
import {Observable} from "rxjs";
import {selector_wallets} from "../../store/wallet/wallet.selectors";

import * as walletActions from '../../store/wallet/wallet.actions'

@Component({
  selector: 'app-wallet-manager-dialog',
  templateUrl: './wallet-manager-dialog.component.html',
  styleUrls: ['./wallet-manager-dialog.component.scss']
})
export class WalletManagerDialogComponent implements OnInit {

  $wallets: Observable<IWallet[]>

  createWalletModel: IWallet = {
    name: '',
    address: '',
    privateKey: ''
  }

  constructor(private walletStore: Store<WalletStore>,
              private dialogRef: DynamicDialogRef) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets)
  }

  createWallet() {
    this.walletStore.dispatch(walletActions.addWalletAction(this.createWalletModel))
    this.createWalletModel = {name: '', address: '', privateKey: ''}
  }
}
