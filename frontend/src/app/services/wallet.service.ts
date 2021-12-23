import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IWallet} from "../dto/IWallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {
  }

  getAll = () => this.http.get<IWallet[]>(`/api/wallet`)

  addWallet = (wallet: IWallet) => this.http.post<IWallet>(`/api/wallet`, wallet)

  deleteWallet = (wallet: IWallet) => this.http.delete(`/api/wallet/${wallet.id}`)
}
