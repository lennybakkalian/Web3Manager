import {createReducer, on} from "@ngrx/store";
import * as actions from "./misc.actions";
import {initialWalletState} from "../wallet/wallet.reducer";

export interface MiscStore {
  loggedIn: boolean
}

export const initialMiscState: MiscStore = {
  loggedIn: false
}

export const miscReducer = createReducer(
  initialWalletState,
  on(actions.setLoggedInAction, (state, payload) => ({...state, loggedIn: payload}))
)
