import {Injectable} from "@angular/core";
import {WalletService} from "../../services/wallet.service";
import {
  addWalletAction,
  deleteWalletAction,
  loadWalletsAction,
  saveWalletAction,
  setWalletsAction,
  WalletActions
} from "./wallet.actions";
import {catchError, EMPTY, exhaustMap, from, map, mergeMap, of, switchMap, tap, timer} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {WalletStore} from "./wallet.reducer";
import {Store} from "@ngrx/store";
import {showToast} from "../misc/misc.actions";
import {web3} from "../../services/web3.service";
import {bnbPrice} from "../misc/misc.effects";


@Injectable()
export class WalletEffects {

  constructor(private actions$: Actions,
              private store: Store<WalletStore>,
              private walletService: WalletService) {
  }

  loadWallets$ = createEffect(() => this.actions$.pipe(
      ofType(WalletActions.LOAD_WALLETS, ROOT_EFFECTS_INIT),
      mergeMap(() => this.walletService.getAll().pipe(
        tap(wallets => wallets.forEach(wallet => web3.eth.accounts.wallet.add({
          address: wallet.address,
          privateKey: wallet.privateKey
        }))),
        map(wallets =>
          setWalletsAction({
            wallets: wallets.map(wallet => ({
              ...wallet,
              balance: timer(0, 1000 * 2).pipe( // refresh balance every second when subscribed
                switchMap(_ => from(web3.eth.getBalance(wallet.address)).pipe(
                  map(units => ({balance: units, euro: Number(units) / 10e17 * bnbPrice})),
                  //tap(console.log)
                ))
              )
            }))
          })
        ),
        catchError(() => EMPTY)
      ))
    )
  )

  addWallet$ = createEffect(() => this.actions$.pipe(
    ofType(saveWalletAction),
    exhaustMap(action => this.walletService.addWallet(action).pipe(
      switchMap(wallet => [
        addWalletAction(wallet),
        showToast({
          severity: 'success',
          summary: 'Wallet created',
          data: {safeHtml: `<span style="font-size:13px">${wallet.address}</span>`},
          closable: true,
          life: 1000 * 6
        })
      ]),
      catchError(err => {
          console.log(err)
          return of(showToast({
            severity: 'error',
            summary: 'Error while saving this wallet',
            detail: 'More details in the console.'
          }))
        }
      )
    ))
  ))

  deleteWallet$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWalletAction),
    exhaustMap(action => this.walletService.deleteWallet(action).pipe(
      switchMap(res => [
        loadWalletsAction(),
        showToast({
          severity: 'success',
          summary: 'Wallet deleted',
          closable: true
        })
      ]),
      catchError(err => {
          console.log(err)
          return of(showToast({
            severity: 'error',
            summary: 'Could not delete wallet',
            detail: 'More details in the console.'
          }))
        }
      )
    ))
  ))

}
