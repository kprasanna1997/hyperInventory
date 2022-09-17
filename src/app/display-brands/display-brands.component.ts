import { Component, OnInit } from '@angular/core';
import { Brand } from '../interface/brand';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-display-brands',
  templateUrl: './display-brands.component.html',
  styleUrls: ['./display-brands.component.css']
})
export class DisplayBrandsComponent implements OnInit {

  brands: Brand[] = [];
  errorMessage: string = "";

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.httpService.getBrands().subscribe((brandLists) => {
      this.brands = brandLists.results;
      console.log(this.brands);
    })
  }

  deleteBrand(brand: Brand) {
    this.httpService.deleteBrand(brand).subscribe()
    this.getBrands()
  }
}
