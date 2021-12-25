import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {WalletManagerDialogComponent} from "./components/wallet-manager-dialog/wallet-manager-dialog.component";
import {SelectNodeComponent} from "./components/select-node/select-node.component";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {WalletStore} from "./store/wallet/wallet.reducer";
import {DialogService} from "primeng/dynamicdialog";
import {web3, Web3Service} from "./services/web3.service";
import {selector_selectedWallet, selector_wallets} from "./store/wallet/wallet.selectors";
import {loadWalletsAction, saveWalletAction, selectWalletAction} from "./store/wallet/wallet.actions";
import Web3 from "web3";
import {MiscStore} from "./store/misc/misc.reducer";
import {CookieService} from "ngx-cookie-service";
import {IWallet} from "./dto/IWallet";
import {loadConfig} from "./store/misc/misc.actions";
import {selector_config} from "./store/misc/misc.selector";

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styles: [`
    :host {
      ::ng-deep {
        .p-dropdown {
          min-width: 335px;

          .p-inputtext {
            padding: 10px !important;
            padding-right: 2rem !important;
          }
        }
      }
    }
  `]
})
export class PageWrapperComponent implements OnInit {

  nodeEndpoint: string | null
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'Lookup',
      routerLink: 'lookup'
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
            header: 'Change your websocket node'
          })
        },
        {
          label: 'Change settings',
          routerLink: 'settings'
        }
      ]
    }
  ];

  $wallets: Observable<IWallet[]>
  $selectedWallet: Observable<IWallet | null>
  $config: Observable<any>

  constructor(public walletStore: Store<WalletStore>,
              public miscStore: Store<MiscStore>,
              private dialogService: DialogService,
              public web3Service: Web3Service,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.walletStore.dispatch(loadWalletsAction())
    this.miscStore.dispatch(loadConfig())
    this.$config = this.miscStore.select(selector_config)

    this.$wallets = this.walletStore.select(selector_wallets)
    this.$selectedWallet = this.walletStore.select(selector_selectedWallet)

    // load node endpoint
    this.nodeEndpoint = localStorage.getItem('w3m.node')
    if (!this.nodeEndpoint) {
      this.dialogService.open(SelectNodeComponent, {
        header: 'Select your websocket node',
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

  selectWallet = (wallet: IWallet) => this.walletStore.dispatch(selectWalletAction({wallet: wallet}))

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
