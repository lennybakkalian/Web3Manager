import {createAction, props} from "@ngrx/store";
import {IWallet} from "../../dto/IWallet";

export enum WalletActions {
  SAVE_WALLET = '[WALLET] save wallet',
  DELETE_WALLET = '[WALLET] delete wallet',
  SELECT_WALLET = '[WALLET] select wallet',
  LOAD_WALLETS = '[WALLET] load wallets',

  SET_WALLETS = '[WALLET] set wallets',
  ADD_WALLET = '[WALLET] add wallet'
}

export const saveWalletAction = createAction(WalletActions.SAVE_WALLET, props<{ name: string, address: string, privateKey: string }>())
export const deleteWalletAction = createAction(WalletActions.DELETE_WALLET, props<IWallet>())
export const selectWalletAction = createAction(WalletActions.SELECT_WALLET, props<{ wallet: IWallet }>())
export const loadWalletsAction = createAction(WalletActions.LOAD_WALLETS)

export const setWalletsAction = createAction(WalletActions.SET_WALLETS, props<{ wallets: IWallet[] }>())
export const addWalletAction = createAction(WalletActions.ADD_WALLET, props<IWallet>())
