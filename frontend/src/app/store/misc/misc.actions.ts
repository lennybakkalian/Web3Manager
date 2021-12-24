import {createAction, props} from "@ngrx/store";
import {Message} from "primeng/api";

export enum MiscActions {
  SHOW_TOAST = '[MISC] show toast',
  SET_CONFIG = '[MISC] set config',
  LOAD_CONFIG = '[MISC] load config',
  SAVE_CONFIG = '[MISC] save config'
}

export const showToastAction = createAction(MiscActions.SHOW_TOAST, props<Message>())
export const setConfig = createAction(MiscActions.SET_CONFIG, props<{ config: any }>())
export const saveConfig = createAction(MiscActions.SAVE_CONFIG, props<{ config: any }>())
export const loadConfig = createAction(MiscActions.LOAD_CONFIG)
