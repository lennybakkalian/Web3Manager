import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MiscStore} from "../store/misc/misc.reducer";
import {Store} from "@ngrx/store";
import {selector_config} from "../store/misc/misc.selector";
import {BscScanTransaction} from "../dto/BscScan.dto";

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  BSC_SCAN_API_KEY: string

  constructor(private http: HttpClient,
              private miscStore: Store<MiscStore>) {
    this.miscStore.select(selector_config).subscribe(config => {
      console.log(config)
      this.BSC_SCAN_API_KEY = config['BSC_SCAN_API_KEY']
    })
  }

  getTransactions(address: string, page = 1) {
    return this.http.get<{ message: string, result: BscScanTransaction[] }>(`https://api.bscscan.com/api`, {
      params: {
        apikey: this.BSC_SCAN_API_KEY,
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 999999999,
        page: page,
        offset: 200
      }
    })
  }

}
