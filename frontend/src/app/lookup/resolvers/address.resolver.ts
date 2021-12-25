import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<ResolvedAddress> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return of({
      address: route.paramMap.get('address'),
      internalName: 'example' // TODO: get internal name
    });
  }
}

export interface ResolvedAddress {
  internalName: string
  address: string
}
