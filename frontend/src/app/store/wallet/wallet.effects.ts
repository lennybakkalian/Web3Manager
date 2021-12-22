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
import {catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {WalletStore} from "./wallet.reducer";
import {Store} from "@ngrx/store";
import {showToast} from "../misc/misc.actions";


@Injectable()
export class WalletEffects {

  constructor(private actions$: Actions,
              private store: Store<WalletStore>,
              private walletService: WalletService) {
  }

  loadWallets$ = createEffect(() => this.actions$.pipe(
      ofType(WalletActions.LOAD_WALLETS, ROOT_EFFECTS_INIT),
      mergeMap(() => this.walletService.getAll().pipe(
        map(wallets => setWalletsAction({wallets: wallets})),
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
