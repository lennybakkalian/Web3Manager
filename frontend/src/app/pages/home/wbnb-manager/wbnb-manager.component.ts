import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {web3} from "../../../services/web3.service";
import {abis} from "../../../misc/abis";
import {Store} from "@ngrx/store";
import {WalletStore} from "../../../store/wallet/wallet.reducer";
import {selector_selectedWallet} from "../../../store/wallet/wallet.selectors";
import {IWallet} from "../../../dto/IWallet";
import {bnbPrice} from "../../../store/misc/misc.effects";

@Component({
  selector: 'app-wbnb-manager',
  templateUrl: './wbnb-manager.component.html',
  styleUrls: ['./wbnb-manager.component.scss']
})
export class WbnbManagerComponent implements OnInit, OnDestroy {

  private subscription = new Subscription()

  selectedWallet: IWallet | null

  wBnbToBnb = true

  bnbBalance = 0
  wBnbBalance = 0

  from_transferAmount = 0;
  from_balance = 0

  to_transferAmount = 0;
  to_balance = 0;

  loading = false
  receipt: any
  receiptError = ""

  constructor(private walletStore: Store<WalletStore>) {
  }

  ngOnInit() {
    this.subscription.add(interval(1000).subscribe(() => this.updateData()))
    this.subscription.add(this.walletStore.select(selector_selectedWallet).subscribe(w => {
      this.selectedWallet = w
    }))
  }

  async updateData() {
    if (!this.selectedWallet)
      return
    // @ts-ignore
    const wBnbContract = new web3.eth.Contract(abis.wbnb, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
    this.wBnbBalance = Number(await wBnbContract.methods.balanceOf(this.selectedWallet.address).call())
    this.bnbBalance = Number(await web3.eth.getBalance(this.selectedWallet.address))

    if (this.wBnbToBnb) {
      this.from_balance = this.wBnbBalance
      this.to_balance = this.bnbBalance
    } else {
      this.from_balance = this.bnbBalance
      this.to_balance = this.wBnbBalance
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  swap() {
    this.from_transferAmount = 0
    this.to_transferAmount = 0
    this.wBnbToBnb = !this.wBnbToBnb
    this.receipt = null
    this.receiptError = ""
    this.updateData()
  }

  bnbPrice = () => bnbPrice

  async execTransaction() {
    this.loading = true

    // @ts-ignore
    const wBnbContract = new web3.eth.Contract(abis.wbnb, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')

    const tx = this.wBnbToBnb ? wBnbContract.methods.withdraw(String(this.from_transferAmount)) : wBnbContract.methods.deposit()

    console.log(tx, this.from_transferAmount)
    try {
      const value = this.wBnbToBnb ? 0 : String(this.from_transferAmount)
      this.receipt = await tx.send({
        from: this.selectedWallet?.address,
        gas: (await tx.estimateGas({from: this.selectedWallet?.address, value: value}) * 1.20).toFixed(),
        value: value
      })
    } catch (e) {
      this.receipt = e
      console.error(e)
      this.receiptError = "Error while executing transaction"
    }
    this.loading = false


  }
}
