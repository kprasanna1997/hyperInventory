import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../interface/brand';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-display-brands',
  templateUrl: './display-brands.component.html',
  styleUrls: ['./display-brands.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayBrandsComponent implements OnInit {

  isLoading: boolean = false;

  @Input() brands: Brand[] = []
  @Output() brandsAfterDeletion = new EventEmitter()

  constructor(private httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteBrand(brand: Brand) {
    this.isLoading = true;
    this.httpService.deleteBrand(brand).subscribe((response) => {
      if (response) {
        console.log(response)
        this.toastr.success('Sucessfully deleted!', 'Successful');
        this.brandsAfterDeletion.emit();
        this.isLoading = false;
      }
    }, error => {
      if (error) {
        this.toastr.error(error.error.title, 'Unsuccessful')
        this.brandsAfterDeletion.emit();
        this.isLoading = false;
        console.log(this.isLoading);
      }
    })
  }
}
