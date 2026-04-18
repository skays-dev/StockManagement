import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { ProductsComponent } from './features/products/products.component';
import { StockMovementsComponent } from './features/stock-movements/stock-movements.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'stock-movements', component: StockMovementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
