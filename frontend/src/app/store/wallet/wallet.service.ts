import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IWallet} from "@shared";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {
  }

  getAll = () => this.http.get<IWallet[]>(`/api/wallet`)
}
