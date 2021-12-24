import {createReducer, on} from "@ngrx/store";
import * as actions from "./misc.actions";
import {initialWalletState} from "../wallet/wallet.reducer";

export interface MiscStore {
  config: any
}

export const initialMiscState: MiscStore = {
  config: null
}

export const miscReducer = createReducer(
  initialWalletState,
  on(actions.setConfig, (state, payload) => ({...state, config: payload.config}))
)
