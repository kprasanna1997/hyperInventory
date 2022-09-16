import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { DisplayBrandsComponent } from './display-brands/display-brands.component';


const routes: Routes = [
  { path: "", component: AddBrandComponent },
  { path: "display-brands", component: DisplayBrandsComponent },
  { path: "edit-brand/:id", component: AddBrandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
