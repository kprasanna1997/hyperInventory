import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interface/brand';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "https://devapi.hyperinvento.com"
  companyId = "d2ea8d62-786f-410e-acf5-7c2d72b17deb"
  access_token: 'KUsb7DoQXbZQPHJHMU2NfMhNZ2XShi'

  
  constructor(private http: HttpClient) { }

  addBrand(brand: Brand) {
    return this.http.post(`${this.url}/v1/companies/${this.companyId}/brands`, brand)
  }

  getBrandDetails() {
    return this.http.get<any>(`${this.url}/v1/companies/${this.companyId}/brands`)
  }
  
}
