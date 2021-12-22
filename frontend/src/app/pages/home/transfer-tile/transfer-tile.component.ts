import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IWallet} from "@shared";
import {Store} from "@ngrx/store";
import {WalletStore} from "../../../store/wallet/wallet.reducer";
import {selector_selectedWallet} from "../../../store/wallet/wallet.selectors";
import {web3} from "../../../services/web3.service";
import {bnbPrice} from "../../../store/misc/misc.effects";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-transfer-tile',
  templateUrl: './transfer-tile.component.html',
  styleUrls: ['./transfer-tile.component.scss']
})
export class TransferTileComponent implements OnInit {

  $selectedWallet: Observable<IWallet | null>

  transfer_from: IWallet | null
  transfer_to: IWallet | null
  transfer_value = 0
  transfer_loading = false

  constructor(private store: Store<WalletStore>,
              private messageService: MessageService) {
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

  async executeTransfer() {
    this.transfer_loading = true
    try {
      await web3.eth.sendTransaction({
        from: this.transfer_from?.address,
        to: this.transfer_to?.address,
        value: (10e17 / bnbPrice * this.transfer_value).toFixed(),
        gas: await web3.eth.estimateGas({from: this.transfer_from?.address, to: this.transfer_to?.address})
      })
      this.messageService.add({
        severity: 'success',
        summary: 'Transaction successful',
        data: {
          safeHtml: `
          <span>Successfully sent ${this.transfer_value.toFixed(2)}€</span>
        `
        }
      })
      this.transfer_value = 0
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Transaction failed',
        detail: e as string
      })
    }
    this.transfer_loading = false
  }
}
