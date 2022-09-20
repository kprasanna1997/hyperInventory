import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Brand } from '../interface/brand';
import { HttpService } from '../Services/http.service';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css'],
})
export class AddBrandComponent implements OnInit, OnDestroy {

  isEdit: boolean = false;
  brandId: number;
  brandForm: FormGroup;
  brands: Brand[] = [];
  paramSubscription: Subscription
  brandsToPatch: Brand[] = [];

  @ViewChild("close") modal: ElementRef

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
    console.log(this.isEdit);

    this.brandForm = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]+$")]],
      logo: ["", [Validators.required, Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|svg)$")]]
    })

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.isEdit = true
        this.brandId = params["id"]
        console.log(this.brandId);
        this.getBrandsToPatch()
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

  getBrandsToPatch() {
    this.httpService.getBrands().subscribe((brands) => {
      this.brandsToPatch = brands.results
      this.patchBrandForm(this.brands, this.brandId)
    })
  }
  addBrand() {
    if (!this.isEdit) {
      this.brandForm.value.logo = "https://static.toiimg.com/thumb/msid-60175275,width-400,resizemode-4/60175275.jpg";

      this.httpService.addBrand(this.brandForm.value).subscribe((response) => {
        if (response) {
          this.toastr.success('Sucessfully Added!', 'Successful');
          this.brandForm.reset()
          this.modal.nativeElement.click()
          this.getBrands()
        }
      }, error => {
        if (error) {
          this.toastr.error(error.error.title, 'Unsuccessful')
        }
      })
    }
  }

  updateBrand() {
    if (this.isEdit) {
      this.httpService.editBrand(this.brandForm.value).subscribe((response) => {
        if (response) {
          console.log(response)
          this.toastr.success('Sucessfully Updated!', 'Successful');
          this.brandForm.reset()
          this.modal.nativeElement.click()
          this.isEdit = false
          this.getBrands()
        }
      }, error => {
        if (error) {
          this.toastr.error(error.error.title, 'Unsuccessful')
        }
      });
      // this.router.navigate(["add"])
    }
  }


  getBrands() {
    this.httpService.getBrands().subscribe((brands) => {

      if (brands) {
        this.toastr.success('Sucessfully fetched!', 'Successful');
        this.brands = brands.results;
        console.log(this.brands);
      }
    }, error => {
      if (error) {
        this.toastr.error(error.error.title, 'Unsuccessful')
      }
    })
  }

  brandsAfterDeletion() {
    this.getBrands()
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }
}

