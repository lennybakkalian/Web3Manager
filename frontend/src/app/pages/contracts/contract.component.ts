import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IContract} from "../../dto/IContract";
import {ContractService} from "../../services/contract.service";
import {AbiItem} from 'web3-utils'
import {Store} from "@ngrx/store";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Observable} from "rxjs";
import {IWallet} from "../../dto/IWallet";
import {selector_selectedWallet} from "../../store/wallet/wallet.selectors";
import {ConfirmationService} from "primeng/api";
import {web3} from "../../services/web3.service";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contract: IContract | null
  state: {
    selectedAbiItem?: AbiItem,
    inputs: any,
    result: any
  } = {
    inputs: {},
    result: ''
  }

  $selectedWallet: Observable<IWallet | null>

  constructor(private activatedRoute: ActivatedRoute,
              private contractService: ContractService,
              private walletStore: Store<WalletStore>,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.$selectedWallet = this.walletStore.select(selector_selectedWallet)
    this.activatedRoute.params.subscribe(params => {
      this.contract = null
      this.state = {inputs: {}, result: ''}
      this.contractService.getContract(params['id']).subscribe(c => this.contract = c)
      console.log(params)
    })
  }

  getAbiFunctions() {
    return this.contract?.abi.filter(r => r.type == 'function')
  }

  selectAbi(abi: AbiItem) {
    this.state.selectedAbiItem = abi
    this.state.inputs = {}
    this.state.result = ''
  }

  call() {
    this.exec('call')
  }

  send($event: MouseEvent) {
    this.confirmationService.confirm({
      target: $event.target!!,
      message: 'Do you really want to perform this transaction?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // send transaction
      }
    });
  }

  async exec(method: 'call' | 'send') {

    const contract = new web3.eth.Contract(this.contract!!.abi, this.contract!!.address)


    if (method == 'call') {
      this.state.result = await contract.methods[this.state.selectedAbiItem!!.name!!].apply(null, Object.values(this.state.inputs)).call()
    }

  }
}
