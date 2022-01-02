import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IContract} from "../dto/IContract";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) {
  }

  getContracts = () => this.http.get<IContract[]>(`/api/contract`)

  getContract = (id: number) => this.http.get<IContract>(`/api/contract/${id}`).pipe(map(c => ({
    ...c,
    abi: JSON.parse(c.abi + '')
  })))

  saveContract = (data: IContract) => this.http.post<IContract>(`/api/contract`, data)

  deleteContract = (id: number) => this.http.delete(`/api/contract/${id}`)
}
