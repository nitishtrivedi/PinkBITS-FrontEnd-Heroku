import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@pinkbits/users-auth-shared-lib';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { AdminCategoriesListComponent } from './pages/categories/categories-list/admin-categories-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

//Creating ROUTES--------------------------------------------------------------------------------

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: AdminDashboardComponent
            },
            {
                path: 'categories',
                component: AdminCategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'products/form',
                component: ProductFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductFormComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            },
            {
                path: 'orders',
                component: OrderListComponent
            },
            {
                path: 'orders/:id',
                component: OrderDetailComponent
            }
        ]
    }
    // {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full'
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class AppRoutingModule {}
