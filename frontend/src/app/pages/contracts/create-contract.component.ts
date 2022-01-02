import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {IContract} from "../../dto/IContract";

@Component({
  selector: 'app-create-contract',
  template: `
    <div style="display:flex;flex-direction:column">
      <label>Name</label>
      <input pInputText placeholder="Contract name" [(ngModel)]="contract.name">
      <label>Address</label>
      <input pInputText placeholder="0x" [(ngModel)]="contract.address">
      <label>Abi</label>
      <textarea pInputTextarea placeholder="[]" style="resize:vertical" [(ngModel)]="contract.abi"></textarea>
      <p-button label="Save" (click)="save()"></p-button>
    </div>
  `,
  styles: [`
    label {
      margin-top: 10px;
    }
  `]
})
export class CreateContractComponent implements OnInit {

  contract: IContract = {abi: [], address: "", name: ""}

  constructor(private contractService: ContractService) {
  }

  ngOnInit(): void {
  }

  save() {
    this.contractService.saveContract(this.contract).subscribe(res => {
      document.location.reload() // TODO: improve someday
    })
  }
}
