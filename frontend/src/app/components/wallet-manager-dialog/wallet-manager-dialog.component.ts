import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {IWallet} from "@shared";
import {Observable} from "rxjs";
import {selectWallets} from "../../store/wallet/wallet.selectors";

@Component({
  selector: 'app-wallet-manager-dialog',
  templateUrl: './wallet-manager-dialog.component.html',
  styleUrls: ['./wallet-manager-dialog.component.scss']
})
export class WalletManagerDialogComponent implements OnInit {

  walletsSelector: Observable<IWallet[]>

  createWalletModel: IWallet = {
    name: '',
    address: '',
    privateKey: ''
  }

  constructor(private walletStore: Store<WalletStore>,
              private dialogRef: DynamicDialogRef) {
  }

  ngOnInit() {
    this.walletsSelector = this.walletStore.select(selectWallets)
  }

  createWallet() {

  }
}
