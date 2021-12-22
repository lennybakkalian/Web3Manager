import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Store} from "@ngrx/store";
import {WalletStore} from "./store/wallet/wallet.reducer";
import {selector_selectedWallet, selector_wallets} from "./store/wallet/wallet.selectors";
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {DialogService} from "primeng/dynamicdialog";
import {saveWalletAction, selectWalletAction} from "./store/wallet/wallet.actions";
import {web3, Web3Service} from "./services/web3.service";
import {SelectNodeComponent} from "./components/select-node/select-node.component";
import {WalletManagerDialogComponent} from "./components/wallet-manager-dialog/wallet-manager-dialog.component";
import Web3 from "web3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  nodeEndpoint: string | null
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'Wallets',
      command: () => this.dialogService.open(WalletManagerDialogComponent, {
        header: 'Wallet manager',
        width: '1000px'
      })
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'Change node',
          command: () => this.dialogService.open(SelectNodeComponent, {
            header: 'Change your node'
          })
        }
      ]
    }
  ];

  $wallets: Observable<IWallet[]>
  $selectedWallet: Observable<IWallet | null>

  constructor(public walletStore: Store<WalletStore>,
              private dialogService: DialogService,
              public web3Service: Web3Service) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets)
    this.$selectedWallet = this.walletStore.select(selector_selectedWallet)

    // load node endpoint
    this.nodeEndpoint = localStorage.getItem('w3m.node')
    if (!this.nodeEndpoint) {
      this.dialogService.open(SelectNodeComponent, {
        header: 'Select your node',
        closable: false
      })
      return
    }

    this.initWeb3()
  }

  generateWallet() {
    const generatedAccount = web3.eth.accounts.create()
    const wallet: IWallet = {
      name: `Generated ${generatedAccount.address.slice(2, 6)}`,
      address: generatedAccount.address,
      privateKey: generatedAccount.privateKey
    }
    this.walletStore.dispatch(saveWalletAction(wallet))
  }

  selectWallet = (wallet: IWallet) => this.walletStore.dispatch(selectWalletAction(wallet))

  initWeb3() {
    web3.setProvider(new Web3.providers.WebsocketProvider(this.nodeEndpoint!!, {
      clientConfig: {
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
        keepalive: true,
        keepaliveInterval: 60000
      },
      reconnect: {
        auto: true,
        delay: 5000,
        onTimeout: true
      }
    }))
  }
}
