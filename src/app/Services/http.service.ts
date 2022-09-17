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

  constructor(private http: HttpClient) { }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(`${environment.apiUrl}/v1/companies/${environment.companyId}/brands`, brand)
  }

  getBrands() {
    return this.http.get<any>(`${environment.apiUrl}/v1/companies/${environment.companyId}/brands`)
  }

  deleteBrand(brand: Brand) {
    return this.http.post<Brand>(`${environment.apiUrl}/v1/brands/${brand.id}/delete`, brand)
  }

  editBrand(brand: Brand) {
    return this.http.patch<Brand>(`${environment.apiUrl}/v1/brands/${brand.id}`, brand)
  }
}

