import {createAction, props} from "@ngrx/store";
import {IWallet} from "@shared";

export enum WalletActions {
  ADD_WALLET = '[WALLET] add wallet',
  REMOVE_WALLET = '[WALLET] remove wallet',
  SELECT_WALLET = '[WALLET] select wallet',
  LOAD_WALLETS = '[WALLET] load wallets',

  SET_WALLETS = '[WALLET] set wallets',
}

export const addWalletAction = createAction(WalletActions.ADD_WALLET, props<{ name: string, address: string, privateKey: string }>())
export const removeWalletAction = createAction(WalletActions.REMOVE_WALLET, props<{ wallet: IWallet }>())
export const selectWalletAction = createAction(WalletActions.SELECT_WALLET, props<{ wallet: IWallet }>())
export const loadWallets = createAction(WalletActions.LOAD_WALLETS)

export const setWallets = createAction(WalletActions.SET_WALLETS, props<{ wallets: IWallet[] }>())
