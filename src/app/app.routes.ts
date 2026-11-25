import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { ProductPage } from './pages/product-page/product-page';
import { UserPage } from './pages/user-page/user-page';
import { ItemPage } from './pages/item-page/item-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: 'dashboard', component: DashboardPage},
    {path: 'products', component: ProductPage},
    {path: 'users', component: UserPage},
    {path: 'items', component: ItemPage},
    {path: '**', component: NotFoundPage}
];
