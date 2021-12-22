import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WalletStore} from "./wallet.reducer";


const feature = createFeatureSelector<WalletStore>("wallets")


export const selectWallets = createSelector(feature, state => state.wallets)
export const selectSelectedWallets = createSelector(feature, state => state.selected)
