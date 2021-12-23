import {Observable} from "rxjs";

export interface IWallet {
    id?: number,
    name: string,
    address: string,
    privateKey: string,
    balance?: Observable<Balance>
}

export interface Balance {
    balance: string,
    euro: number
}