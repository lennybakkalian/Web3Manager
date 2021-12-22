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
  on(actions.selectWalletAction, (state, payload) => ({...state, selected: payload.wallet}))
)
