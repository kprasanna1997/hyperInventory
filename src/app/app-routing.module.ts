import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { DisplayBrandsComponent } from './display-brands/display-brands.component';


const routes: Routes = [
  { path: "", redirectTo: "add", pathMatch: "full" },
  { path: "add", component: AddBrandComponent },
  { path: "display", component: DisplayBrandsComponent },
  { path: "edit/:id", component: AddBrandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
