import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { ProductsComponent } from './features/products/products.component';
import { StockMovementsComponent } from './features/stock-movements/stock-movements.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    StockMovementsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
