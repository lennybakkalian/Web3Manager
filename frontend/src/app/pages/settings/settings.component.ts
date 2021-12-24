import {Component, OnDestroy, OnInit} from '@angular/core';
import {MiscStore} from "../../store/misc/misc.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {selector_config} from "../../store/misc/misc.selector";
import {saveConfig} from "../../store/misc/misc.actions";
import {ComponentCanDeactivate} from "../../misc/pending-changes.guard";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  monacoEditorConfig = {language: 'json'}

  config: any
  loadedConfig: any

  subscriptions = new Subscription()

  constructor(private miscStore: Store<MiscStore>) {
  }

  canDeactivate() {
    return this.loadedConfig == this.config
  }

  ngOnInit() {
    this.subscriptions.add(
      this.miscStore.select(selector_config).subscribe(config => {
        this.config = JSON.stringify(config, null, "\t")
        this.loadedConfig = this.config
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  saveChanges() {
    this.miscStore.dispatch(saveConfig({
      config: JSON.parse(this.config)
    }))
  }
}
