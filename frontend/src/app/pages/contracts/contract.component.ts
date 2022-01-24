import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IContract} from "../../dto/IContract";
import {ContractService} from "../../services/contract.service";
import {AbiItem} from 'web3-utils'
import {Store} from "@ngrx/store";
import {WalletStore} from "../../store/wallet/wallet.reducer";
import {Observable, Subscription} from "rxjs";
import {IWallet} from "../../dto/IWallet";
import {selector_selectedWallet} from "../../store/wallet/wallet.selectors";
import {ConfirmationService} from "primeng/api";
import {web3} from "../../services/web3.service";
import {bnbPrice} from "../../store/misc/misc.effects";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, OnDestroy {

  contract: IContract | null
  state: {
    value: number;
    selectedAbiItem?: AbiItem,
    inputs: {
      [index: string]: string
    },
    result: any,
    loading: boolean
  } = {
    inputs: {},
    result: '',
    loading: false,
    value: 0
  }
  decimalCalculator = 8

  $subscriptions = new Subscription()
  $selectedWallet: Observable<IWallet | null>
  selectedWallet: IWallet | null


  isNumericResponse = false

  constructor(private activatedRoute: ActivatedRoute,
              private contractService: ContractService,
              private walletStore: Store<WalletStore>,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.$selectedWallet = this.walletStore.select(selector_selectedWallet)
    this.$subscriptions.add(this.walletStore.select(selector_selectedWallet).subscribe(w => this.selectedWallet = w))

    this.activatedRoute.params.subscribe(params => {
      this.contract = null
      this.state = {inputs: {}, result: '', loading: false, value: 0}
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
    this.state.loading = false
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
        this.exec('send')
      }
    });
  }

  async exec(method: 'call' | 'send') {

    const contract = new web3.eth.Contract(this.contract!!.abi, this.contract!!.address)

    this.state.loading = true
    try {

      const input = Object.keys(this.state.inputs).map((value, index) => {
          if (this.state.selectedAbiItem!!.inputs!![index].type.endsWith("[]"))
            return JSON.parse(this.state.inputs[index])
          return this.state.inputs[index]
        }
      )

      this.isNumericResponse = false
      if (method == 'call') {
        const callRes = await contract.methods[this.state.selectedAbiItem!!.name!!].apply(null, input).call({
          from: this.selectedWallet?.address,
          value: Number(this.state.value)
        })
        this.state.result = isNaN(callRes) ? JSON.stringify(callRes) : parseInt(callRes)
        this.isNumericResponse = !isNaN(callRes)
      } else {
        const tx = this.state.result = await contract.methods[this.state.selectedAbiItem!!.name!!].apply(null, input)
        this.state.result = JSON.stringify(
          await tx.send({
            from: this.selectedWallet?.address,
            gas: ((await tx.estimateGas({
              from: this.selectedWallet?.address,
              value: Number(this.state.value)
            })) * 1.20).toFixed(),
            value: Number(this.state.value)
          })
        )
      }
    } catch (e) {
      console.error(e)
      this.state.result = e as string
    }
    this.state.loading = false

  }

  pow(x: number, y: number) {
    return Math.pow(x, y)
  }

  getBnbPrice = () => bnbPrice

  ngOnDestroy() {
    this.$subscriptions.unsubscribe()
  }
}
