import {Injectable, OnInit} from '@angular/core';
import Web3 from "web3";
import {Store} from "@ngrx/store";
import {WalletStore} from "../store/wallet/wallet.reducer";
import {firstValueFrom, Observable} from "rxjs";
import {selector_selectedWallet} from "../store/wallet/wallet.selectors";
import {IWallet} from "../dto/IWallet";

export let web3 = new Web3()

@Injectable({
  providedIn: 'root'
})
export class Web3Service implements OnInit {

  selector_selectedWallet: Observable<IWallet | null>

  constructor(private walletStore: Store<WalletStore>) {
  }

  ngOnInit() {
    this.selector_selectedWallet = this.walletStore.select(selector_selectedWallet)
  }


  getBalance = async (address: string | null = null) => web3.eth.getBalance(address ? address : (await firstValueFrom(this.selector_selectedWallet))?.address ?? 'NO_WALLET_SELECTED')

}
