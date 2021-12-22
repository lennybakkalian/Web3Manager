import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Store} from "@ngrx/store";
import {WalletStore} from "./store/wallet/wallet.reducer";
import {selector_wallets} from "./store/wallet/wallet.selectors";
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {DialogService} from "primeng/dynamicdialog";
import {addWalletAction, selectWalletAction} from "./store/wallet/wallet.actions";
import {web3, Web3Service} from "./services/web3.service";
import {SelectNodeComponent} from "./components/select-node/select-node.component";
import {WalletManagerDialogComponent} from "./components/wallet-manager-dialog/wallet-manager-dialog.component";

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
        width: '80%'
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

  selectedWallet: IWallet;

  constructor(private walletStore: Store<WalletStore>,
              private dialogService: DialogService,
              public web3Service: Web3Service,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets)

    // load node endpoint
    this.nodeEndpoint = localStorage.getItem('w3m.node')
    if (!this.nodeEndpoint) {
      this.dialogService.open(SelectNodeComponent, {
        header: 'Select your node',
        closable: false
      })
    }

    /* this.dialogService.open(WalletManagerDialogComponent, {
       header: 'Wallet manager',
       width: '80%'
     })*/
  }


  updateSelectedWallet = () => this.walletStore.dispatch(selectWalletAction({wallet: this.selectedWallet}))

  generateWallet() {
    const generatedAccount = web3.eth.accounts.create()
    const wallet: IWallet = {
      name: `Generated ${generatedAccount.address.slice(0, 6)}`,
      address: generatedAccount.address,
      privateKey: generatedAccount.privateKey
    }
    this.walletStore.dispatch(addWalletAction(wallet))
    this.messageService.add({
      severity: 'success',
      summary: 'Wallet created',
      data: {
        safeHtml: `<span style="font-size:13px">${wallet.address}</span>`
      },
      closable: true,
      life: 1000 * 6
    });
  }
}
