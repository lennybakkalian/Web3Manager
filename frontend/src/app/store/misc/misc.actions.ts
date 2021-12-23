import {createAction, props} from "@ngrx/store";
import {Message} from "primeng/api";

export enum MiscActions {
  SHOW_TOAST = '[MISC] show toast',
  LOGIN = '[MISC] login'
}

export const showToastAction = createAction(MiscActions.SHOW_TOAST, props<Message>())
export const setLoggedInAction = createAction(MiscActions.LOGIN, props<Boolean>())
