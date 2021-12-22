import {createAction, props} from "@ngrx/store";
import {Message} from "primeng/api";

export enum MiscActions {
  SHOW_TOAST = '[MISC] show toast'
}

export const showToast = createAction(MiscActions.SHOW_TOAST, props<Message>())
