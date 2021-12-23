import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {selector_wallets} from "../../store/wallet/wallet.selectors";

import * as walletActions from '../../store/wallet/wallet.actions'
import {deleteWalletAction, loadWalletsAction} from '../../store/wallet/wallet.actions'
import {ConfirmationService} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {HttpClient} from "@angular/common/http";
import {IWallet} from "../../dto/IWallet";

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
              private confirmationService: ConfirmationService,
              private changeDetectorRef: ChangeDetectorRef,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets).pipe(map(wallets => wallets.flatMap(wallet => Object.assign({}, wallet))))
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

  async copyPrivateKey(wallet: IWallet) {
    await navigator.clipboard.writeText(wallet.privateKey)
  }

  changeName(value: string, id: number, op: OverlayPanel) {
    this.http.post(`/api/wallet/${id}`, {name: value}).subscribe(res => {
      this.walletStore.dispatch(loadWalletsAction())
    })
    op.hide()
  }
}
