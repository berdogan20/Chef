import { Component, OnInit } from '@angular/core';
import { OrderRm, FoodRm, OrderItem, UserRm, OrderDto } from '../api/models';
import { CategoryService, FoodService, UserService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../api/services/order.service';
import { AuthService } from './../auth/auth.service';
import { forkJoin } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  basket: OrderItem[] = [];
  foods: FoodRm[] = [];
  currentUser!: UserRm;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private userService: UserService) { }


  ngOnInit(): void {

    this.userService.getUserBasketUser({ email: this.authService.currentUser?.email! })
      .subscribe(
        (basket) => {
          this.basket = basket;
          console.log(this.basket);
          // Fetch food data for each order
          const foodObservables = basket.map((orderItem) =>
            this.foodService.findFood({ id: orderItem.foodItemId! })
          );

          forkJoin(foodObservables).subscribe(
            (foods) => {
              // All food requests have completed here
              this.foods = foods;
            },
            (err) => this.handleError(err)
          );
        },
        (err) => this.handleError(err)
      );
  }



  private handleError(err: any) {
    console.log("Response Error, Status:", err.status);
    console.log("Response Error, Status Text:", err.statusText);
    console.log(err);
  }


  order() {

    let dto: OrderDto = {
      address: this.authService.currentUser?.address,
      orderDate: new Date().toISOString(),
      orderId: uuidv4(),
      orderOwner: this.authService.currentUser?.email,
      status: "Your order has been received."
    }

    console.log(dto);

    this.orderService.buyOrder({ body: dto })
      .subscribe(_ => {
        this.router.navigate(['my-orders']);
      },
        err => this.handleError(err));
  }
}
