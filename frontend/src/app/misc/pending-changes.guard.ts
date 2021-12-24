import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfirmationService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {


  constructor(private confirmationService: ConfirmationService) {
  }

  canDeactivate(component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate() ? true : new Promise<boolean>(resolve => {
      this.confirmationService.confirm({
        header: 'You have unsaved changes!',
        message: 'Press Cancel to go back and save these changes, or Discard to lose these changes.',
        icon: 'pi pi-exclamation-triangle',
        key: 'confirmDialog',
        acceptLabel: 'Discard',
        acceptButtonStyleClass: 'p-button-danger',
        rejectLabel: 'Cancel',
        accept: () => resolve(true),
        reject: () => resolve(false)
      });
    })
  }

}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean
}
