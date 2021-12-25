import {createReducer, on} from "@ngrx/store";
import * as actions from "./misc.actions";

export interface MiscStore {
  config: any
}

export const initialMiscState: MiscStore = {
  config: null
}

export const miscReducer = createReducer(
  initialMiscState,
  on(actions.setConfig, (state, payload) => ({...state, config: payload.config}))
)
