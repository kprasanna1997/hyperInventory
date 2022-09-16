import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Shared/header/header.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandAddFormComponent } from './brand-add-form/brand-add-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddBrandComponent,
    BrandAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
