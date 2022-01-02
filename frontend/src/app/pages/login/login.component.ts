import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import * as moment from "moment";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authKey: string;
  displayError = false;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  login() {
    this.displayError = false
    this.http.post(`/api/auth/login`, {key: this.authKey}).subscribe(res => {
      if (res) {
        this.cookieService.delete('w3m.key')
        this.cookieService.set('w3m.key', this.authKey, {expires: moment().add(1, 'years').toDate()})
        location.href = '/'
      } else {
        this.displayError = true
      }
    })
  }
}
