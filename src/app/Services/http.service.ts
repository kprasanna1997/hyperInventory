import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Brand } from '../interface/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // url = "https://devapi.hyperinvento.com"
  companyId = "d2ea8d62-786f-410e-acf5-7c2d72b17deb"



  constructor(private http: HttpClient) { }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(`${environment.apiUrl}/v1/companies/${this.companyId}/brands`, brand)
  }

  getBrands() {
    return this.http.get<any>(`${environment.apiUrl}/v1/companies/${this.companyId}/brands`)
  }

  deleteBrand(brand: Brand) {
    console.log(brand);

    return this.http.post<Brand>(`${environment.apiUrl}/v1/brands/${brand.id}/delete`, brand)
  }

  editBrand(brand: Brand) {
    return this.http.put<Brand>(`${environment.apiUrl}/v1/brands/${brand.id}`, brand)
  }
}

