import { Component, OnInit } from '@angular/core';
import { OrderRm, FoodRm} from '../api/models';
import { FoodService } from '../api/services';
import { OrderService } from './../api/services/order.service';
import { AuthService } from './../auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders: OrderRm[] = [];
  foods: FoodRm[] = [];

  constructor(private orderService: OrderService,
    private foodService: FoodService,
    private authService: AuthService) { }


  ngOnInit(): void {
    console.log(this.authService.currentUser?.email);

    this.orderService.listOrder({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(
        (orders) => {
          this.orders = orders;

          // Fetch food data for each order
          const foodObservables = orders.map((order) =>
            this.foodService.findFood({ id: order.foodId! })
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


}
