import { Component, OnInit } from '@angular/core';
import { OrderRm, FoodRm, OrderDto } from '../api/models';
import { FoodService } from '../api/services';
import { OrderService } from './../api/services/order.service';
import { AuthService } from './../auth/auth.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderRm[] = [];
  foods: FoodRm[] = [];

  constructor(private orderService: OrderService,
    private foodService: FoodService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.orderService.searchOrder({ })
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

  //search() {
  //  this.orderService.searchOrder({})
  //    .subscribe(rmList => this.orders = rmList,
  //      this.handleError)
  //}



  private handleError(err: any) {
    console.log("Response Error, Status:", err.status);
    console.log("Response Error, Status Text:", err.statusText);
    console.log(err);
  }


}
