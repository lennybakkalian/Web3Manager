import {IWallet} from "@shared";
import {createReducer, on} from "@ngrx/store";
import * as actions from "./wallet.actions"

export interface WalletStore {
  wallets: IWallet[]
  selected: IWallet | null
}

export const initialWalletState: WalletStore = {
  wallets: [],
  selected: null
}

export const walletReducer = createReducer(
  initialWalletState,
  on(actions.selectWalletAction, (state, payload) => ({...state, selected: payload})),
  on(actions.addWalletAction, (state, payload) => ({...state, wallets: [...state.wallets, payload]})),
  on(actions.setWalletsAction, (state, payload) => ({
    ...state,
    wallets: payload.wallets,
    ...((payload.wallets.find(w => w.id == state.selected?.id)) ? {} : {selected: null})
  }))
)
