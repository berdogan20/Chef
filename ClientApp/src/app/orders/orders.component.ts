import { Component, OnInit } from '@angular/core';
import { OrderRm, FoodRm, OrderDto } from '../api/models';
import { FoodService } from '../api/services';
import { Router } from '@angular/router';
import { OrderService } from './../api/services/order.service';
import { AuthService } from './../auth/auth.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders: OrderRm[] = [];
  statuses: string[] = ["", "Your order has been received",
    "Preparing", "On the Way", "Delivered"];


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }


  ngOnInit(): void {
    this.searchOrders();
  }


  searchOrders() {
    this.orderService.searchOrder()
      .subscribe(o => this.orders = o,
        err => this.handleError(err));
  }




  private handleError(err: any) {
    console.log("Response Error, Status:", err.status);
    console.log("Response Error, Status Text:", err.statusText);
    console.log(err);
  }

  

}
