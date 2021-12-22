import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Store} from "@ngrx/store";
import {WalletStore} from "./store/wallet/wallet.reducer";
import {selectWallets} from "./store/wallet/wallet.selectors";
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {DialogService} from "primeng/dynamicdialog";
import {WalletManagerDialogComponent} from "./components/wallet-manager-dialog/wallet-manager-dialog.component";

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

  walletsSelector: Observable<IWallet[]>
  selectedWallet: IWallet;

  constructor(private store: Store<WalletStore>,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.walletsSelector = this.store.select(selectWallets)


    this.dialogService.open(WalletManagerDialogComponent, {
      header: 'Wallet manager',
      width: '80%'
    })
  }


}
