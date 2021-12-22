import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WalletStore} from "./wallet.reducer";


const feature = createFeatureSelector<WalletStore>("wallets")


export const selector_wallets = createSelector(feature, state => state.wallets)
export const selector_selectedWallet = createSelector(feature, state => state.selected)
