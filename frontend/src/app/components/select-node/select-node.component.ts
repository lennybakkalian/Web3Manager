import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-node',
  template: `
    <div style="display:flex;gap:10px;padding:5px 0">
      <p-dropdown [options]="savedWsEndpoints" [(ngModel)]="endpoint" [editable]="true" appendTo="body"
                  placeholder="ws://... or wss://..."></p-dropdown>
      <button pButton class="p-button-info" (click)="setNode()"
              [disabled]="!endpoint.startsWith('ws://') && !endpoint.startsWith('wss://')">
        Set Node
      </button>
    </div>
  `,
})
export class SelectNodeComponent implements OnInit {

  endpoint = ''
  savedWsEndpoints: { label: string, value: string }[] = [];
  savedWsEndpointsArr: string[] = []

  constructor() {
  }

  ngOnInit() {
    this.endpoint = localStorage.getItem('w3m.node') ?? ''

    this.savedWsEndpointsArr = JSON.parse(localStorage.getItem('w3m.saved_nodes') ?? '[]') as string[]

    this.savedWsEndpoints = this.savedWsEndpointsArr.map(l => ({label: l, value: l}))
  }

  setNode() {
    localStorage.setItem('w3m.node', this.endpoint)

    // save node if not exists in local storage
    if (!this.savedWsEndpointsArr.includes(this.endpoint)) {
      this.savedWsEndpointsArr.push(this.endpoint)
      localStorage.setItem('w3m.saved_nodes', JSON.stringify(this.savedWsEndpointsArr))
    }

    location.reload()
  }

}
