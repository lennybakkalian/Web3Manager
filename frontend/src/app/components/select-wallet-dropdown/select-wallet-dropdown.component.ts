import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {IWallet} from "@shared";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {selector_wallets} from "../../store/wallet/wallet.selectors";

@Component({
  selector: 'app-select-wallet-dropdown',
  templateUrl: './select-wallet-dropdown.component.html',
  styleUrls: ['./select-wallet-dropdown.component.scss']
})
export class SelectWalletDropdownComponent implements OnInit, OnChanges {

  @Input()
  selected: IWallet | null

  @Input()
  ignoreWallets: IWallet[] = []

  @Output()
  selectedChanged = new EventEmitter<IWallet | null>()

  $wallets: Observable<IWallet[]>

  constructor(private walletStore: Store<WalletStore>,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.$wallets = this.walletStore.select(selector_wallets).pipe(map(wallets => wallets.filter(wallet => !this.ignoreWallets.includes(wallet))))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ignoreWallets']) {
      this.ignoreWallets = changes['ignoreWallets'].currentValue
      if (this.selected && this.ignoreWallets.includes(this.selected)) {
        setTimeout(() => this.selectWallet(null)) // update in next frame
      }
      this.ngOnInit()
    } else if (changes['selected']) {
      this.selectWallet(changes['selected'].currentValue)
    }
  }

  selectWallet(wallet: IWallet | null) {
    this.selected = wallet
    this.selectedChanged.emit(wallet)
  }
}
