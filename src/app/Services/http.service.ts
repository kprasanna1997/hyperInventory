import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Brand } from '../interface/brand';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "https://devapi.hyperinvento.com"
  companyId = "d2ea8d62-786f-410e-acf5-7c2d72b17deb"



  constructor(private http: HttpClient) { }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(`${this.url}/v1/companies/${this.companyId}/brands`, brand).pipe(map((res) => {
      console.log(res);
    }))
  }

  getBrandDetails() {
    return this.http.get<any>(`${this.url}/v1/companies/${this.companyId}/brands`)
  }

  deleteBrand(id: string) {
    return this.http.delete<any>(`${this.url}/v1/brands/${id}/delete`)
  }

  editBrand(brand: Brand) {
    return this.http.put<Brand>(`${this.url}/v1/brands/${brand.id}`, brand)
  }
}

