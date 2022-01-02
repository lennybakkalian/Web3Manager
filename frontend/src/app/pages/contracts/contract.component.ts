import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IContract} from "../../dto/IContract";
import {ContractService} from "../../services/contract.service";
import {AbiItem} from 'web3-utils'

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contract: IContract | null
  state: {
    selectedAbiItem?: AbiItem,
    inputs: any
  } = {
    inputs: {}
  }

  constructor(private activatedRoute: ActivatedRoute,
              private contractService: ContractService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.contract = null
      this.state = {inputs: {}}
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
  }
}
