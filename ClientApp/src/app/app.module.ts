import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { BuyFoodComponent } from './buy-food/buy-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { CreateFoodComponent } from './create-food/create-food.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailAdminComponent } from './order-detail-admin/order-detail-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    BasketComponent,
    SignInComponent,
    RegisterComponent,
    UserProfileComponent,
    AdminProfileComponent,
    BuyFoodComponent,
    MyOrdersComponent,
    OrdersComponent,
    EditFoodComponent,
    CreateFoodComponent,
    OrderDetailComponent,
    OrderDetailAdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MenuComponent, pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'buy-food/:foodId', component: BuyFoodComponent, canActivate: [AuthGuard] },
      { path: 'edit-food/:foodId', component: EditFoodComponent, canActivate: [AuthGuard] },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
      { path: 'create-food', component: CreateFoodComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'sign-in', component: SignInComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'order-detail/:orderId', component: OrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'order-detail-admin/:orderId', component: OrderDetailAdminComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }