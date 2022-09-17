import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from '../interface/brand';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit, OnDestroy {

  isEdit: boolean = false;
  brandId: number;
  brandForm: FormGroup;
  brands: Brand[] = [];
  paramSubscription: Subscription

  // @ViewChild("btn") modal:ElementRef

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.brandForm = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]+$")]],
      logo: ["", [Validators.required, Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|svg)$")]]
    })

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      if (params["id"] <= this.brands.length) {
        this.isEdit = true
        this.brandId = params["id"]
        console.log(this.brandId);
        this.getBrands()
      }
    })
  }

  get id() {
    return this.brandForm.get("id")
  }

  get name() {
    return this.brandForm.get("name")
  }

  get logo() {
    return this.brandForm.get("logo")
  }

  patchBrandForm(brand: Brand[], brandId: number) {
    if (brandId !== undefined) {
      const { id, name, logo } = brand[brandId]
      this.brandForm.patchValue({
        id: id,
        name: name,
        logo: logo
      })
    }
  }

  getBrands() {
    this.httpService.getBrands().subscribe((brands) => {
      this.brands = brands.results
      this.patchBrandForm(this.brands, this.brandId)
    })
  }

  addBrand() {
    if (!this.isEdit) {
      this.brandForm.value.logo="https://static.toiimg.com/thumb/msid-60175275,width-400,resizemode-4/60175275.jpg";
      this.httpService.addBrand(this.brandForm.value).subscribe();
      this.brandForm.reset()
      // this.modal.nativeElement.click()
    } else {
      this.httpService.editBrand(this.brandForm.value).subscribe();
      this.brandForm.reset()
      this.isEdit = false
      // this.modal.nativeElement.click()
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }
}
