import {Injectable} from "@angular/core";
import {map, switchMap, tap, timer} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadConfig, saveConfig, setConfig, showToastAction} from "./misc.actions";
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
      ofType(showToastAction),
      tap(action => this.messageService.add(action))
    ), {dispatch: false}
  )

  refreshBnbPrice$ = createEffect(() => timer(0, 1000 * 5).pipe(tap(timer => {
    this.http.get<{ symbol: string, price: string }>(`https://api.binance.com/api/v3/ticker/price?symbol=BNBEUR`).subscribe(res => bnbPrice = parseFloat(res.price))
  })), {dispatch: false})

  loadConfig$ = createEffect(() => this.actions$.pipe(
    ofType(loadConfig),
    switchMap(() => this.http.get(`/api/config`).pipe(
      map(conf => setConfig({config: conf}))
    ))
  ))

  saveConfig$ = createEffect(() => this.actions$.pipe(
    ofType(saveConfig),
    switchMap(action => this.http.post(`/api/config`, action.config).pipe(
      switchMap(_ =>
        [
          loadConfig(),
          showToastAction({
            severity: 'success',
            summary: 'Configuration saved!',
            closable: true,
            life: 1000 * 6
          })
        ]
      )
    ))
  ))
}
