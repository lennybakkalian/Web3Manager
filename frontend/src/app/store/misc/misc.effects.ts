import {Injectable} from "@angular/core";
import {tap, timer} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {showToast} from "./misc.actions";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";

export let bnbPrice: number

@Injectable()
export class MiscEffects {

  constructor(private actions$: Actions,
              private messageService: MessageService,
              private http: HttpClient) {
  }

  showToast$ = createEffect(() => this.actions$.pipe(
      ofType(showToast),
      tap(action => this.messageService.add(action))
    ), {dispatch: false}
  )

  refreshBnbPrice$ = createEffect(() => timer(0, 1000 * 5).pipe(tap(timer => {
    this.http.get<{ symbol: string, price: string }>(`https://api.binance.com/api/v3/ticker/price?symbol=BNBEUR`).subscribe(res => bnbPrice = parseFloat(res.price))
  })), {dispatch: false})

}
