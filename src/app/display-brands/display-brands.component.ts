import { Component, OnInit } from '@angular/core';
import { Brand } from '../interface/brand';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-display-brands',
  templateUrl: './display-brands.component.html',
  styleUrls: ['./display-brands.component.css']
})
export class DisplayBrandsComponent implements OnInit {

  brandLists: Brand[] = [];
  errorMessage: string = "";

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getBrandDetails().subscribe((brandLists) => {
      this.brandLists = brandLists.results;
      console.log(this.brandLists);
    })
  }

}
