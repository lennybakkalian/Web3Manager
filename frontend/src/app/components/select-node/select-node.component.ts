import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-node',
  template: `
    <div style="display:flex;gap:10px;padding:5px 0">
      <input pInputText placeholder="ws://... or wss://..." [(ngModel)]="endpoint"/>
      <button pButton class="p-button-info" (click)="setNode()"
              [disabled]="!endpoint.startsWith('ws://') && !endpoint.startsWith('wss://')">
        Set Node
      </button>
    </div>
  `,
})
export class SelectNodeComponent implements OnInit {

  endpoint = ''

  constructor() {
  }

  ngOnInit() {
    this.endpoint = localStorage.getItem('w3m.node') ?? ''
  }

  setNode() {
    localStorage.setItem('w3m.node', this.endpoint)
    location.reload()
  }

}
