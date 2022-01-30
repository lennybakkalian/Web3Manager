import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {walletReducer} from "./store/wallet/wallet.reducer";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SelectNodeComponent} from './components/select-node/select-node.component';
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {SafeHtmlPipe} from './misc/safe-html.pipe';
import {MiscEffects} from "./store/misc/misc.effects";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {HomeComponent} from './pages/home/home.component';
import {CardModule} from "primeng/card";
import {SelectWalletDropdownComponent} from './components/select-wallet-dropdown/select-wallet-dropdown.component';
import {InputNumberModule} from "primeng/inputnumber";
import {TransferTileComponent} from './pages/home/transfer-tile/transfer-tile.component';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./services/auth.service";
import {PageWrapperComponent} from './page-wrapper.component';
import {LoginComponent} from './pages/login/login.component';
import {miscReducer} from "./store/misc/misc.reducer";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {SettingsComponent} from './pages/settings/settings.component';
import {MonacoEditorModule} from "ngx-monaco-editor";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ContractComponent} from './pages/contracts/contract.component';
import { CreateContractComponent } from './pages/contracts/create-contract.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { WbnbManagerComponent } from './pages/home/wbnb-manager/wbnb-manager.component';
import {SliderModule} from "primeng/slider";
import { PrettyJsonPipe } from './misc/pretty-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WalletManagerDialogComponent,
    SelectNodeComponent,
    SafeHtmlPipe,
    HomeComponent,
    SelectWalletDropdownComponent,
    TransferTileComponent,
    PageWrapperComponent,
    LoginComponent,
    SettingsComponent,
    ContractComponent,
    CreateContractComponent,
    WbnbManagerComponent,
    PrettyJsonPipe
  ],
  imports: [
    StoreModule.forRoot({
      "wallets": walletReducer,
      "misc": miscReducer
    }),
    EffectsModule.forRoot([
      WalletEffects,
      MiscEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    MonacoEditorModule.forRoot({
      defaultOptions: {
        theme: 'vs-dark'
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
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
    ToastModule,
    ConfirmPopupModule,
    CardModule,
    InputNumberModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SliderModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
