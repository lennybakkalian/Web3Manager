import {Injectable} from "@angular/core";
import {map, tap} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {showToast} from "./misc.actions";
import {MessageService} from "primeng/api";


@Injectable()
export class MiscEffects {

  constructor(private actions$: Actions,
              private messageService: MessageService) {
  }

  showToast$ = createEffect(() => this.actions$.pipe(
      ofType(showToast),
      tap(action => this.messageService.add(action))
    ), {dispatch: false}
  )

}
