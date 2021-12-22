import {Injectable} from "@angular/core";
import {WalletService} from "./wallet.service";
import {setWallets, WalletActions} from "./wallet.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {WalletStore} from "./wallet.reducer";
import {Store} from "@ngrx/store";


@Injectable()
export class WalletEffects {

  constructor(private actions$: Actions,
              private store: Store<WalletStore>,
              private walletService: WalletService) {
  }

  loadWallets$ = createEffect(() => this.actions$.pipe(
      ofType(WalletActions.LOAD_WALLETS, ROOT_EFFECTS_INIT),
      mergeMap(() => this.walletService.getAll().pipe(
        map(wallets => setWallets({wallets: wallets})),
        catchError(() => EMPTY)
      ))
    )
  )

}
