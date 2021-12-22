import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Store} from "@ngrx/store";
import {WalletStore} from "./store/wallet/wallet.reducer";
import {selector_wallets} from "./store/wallet/wallet.selectors";
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {DialogService} from "primeng/dynamicdialog";
import {WalletManagerDialogComponent} from "./components/wallet-manager-dialog/wallet-manager-dialog.component";
import {selectWalletAction} from "./store/wallet/wallet.actions";
import {Web3Service} from "./services/web3.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    }
  ];

  $wallets: Observable<IWallet[]>

  selectedWallet: IWallet;

  constructor(private store: Store<WalletStore>,
              private dialogService: DialogService,
              public web3Service: Web3Service) {
  }

  ngOnInit() {
    this.$wallets = this.store.select(selector_wallets)


    this.dialogService.open(WalletManagerDialogComponent, {
      header: 'Wallet manager',
      width: '80%'
    })
  }


  updateSelectedWallet = () => this.store.dispatch(selectWalletAction({wallet: this.selectedWallet}))
}
