import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {walletReducer} from "./store/wallet/wallet.reducer";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WalletManagerDialogComponent} from './components/wallet-manager-dialog/wallet-manager-dialog.component';
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {EffectsModule} from '@ngrx/effects';
import {WalletEffects} from "./store/wallet/wallet.effects";
import {HttpClientModule} from "@angular/common/http";
import {SelectNodeComponent} from './components/select-node/select-node.component';
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import { SafeHtmlPipe } from './misc/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WalletManagerDialogComponent,
    SelectNodeComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      "wallets": walletReducer
    }),
    MenubarModule,
    SharedModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    TableModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    MessageModule,
    EffectsModule.forRoot([
      WalletEffects
    ]),
    ToastModule
  ],
  providers: [DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
