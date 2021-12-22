import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {IWallet} from "@shared";
import {Observable} from "rxjs";
import {selector_wallets} from "../../store/wallet/wallet.selectors";

import * as walletActions from '../../store/wallet/wallet.actions'
import {deleteWalletAction} from '../../store/wallet/wallet.actions'
import {ConfirmationService} from "primeng/api";

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
              private dialogRef: DynamicDialogRef,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets)
  }

  createWallet() {
    this.walletStore.dispatch(walletActions.saveWalletAction(this.createWalletModel))
    this.createWalletModel = {name: '', address: '', privateKey: ''}
  }

  deleteWallet(wallet: IWallet, $event: MouseEvent) {
    this.confirmationService.confirm({
      target: $event.target!!,
      message: `Do you really want to delete the wallet "${wallet.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.walletStore.dispatch(deleteWalletAction(wallet))
      }
    });
  }
}
