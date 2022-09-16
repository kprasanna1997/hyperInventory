import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
 
  brandForm:FormGroup

  constructor(private formBuilder:FormBuilder , private httpService:HttpService) { }

  ngOnInit(): void {
    this.brandForm=this.formBuilder.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]+$")]],
      logo:["",[Validators.required,Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$")]]
    })
  }

  get name(){
    return this.brandForm.get("name")
  }

  get logo(){
    return this.brandForm.get("logo")
  }

  addBrand(){   
   this.httpService.addBrand(this.brandForm.value);
   this.brandForm.reset()
   let closeButton=document.getElementById("close")
   closeButton.click()
  }
  

}
