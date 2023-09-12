import { Component, OnInit } from '@angular/core';
import { OrderRm } from '../api/models';
import { Router } from '@angular/router';
import { OrderService } from './../api/services/order.service';
import { AuthService } from './../auth/auth.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

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
    this.orderService.listOrder({ email: this.authService.currentUser?.email! })
      .subscribe(l => {
        console.log("search");
        this.orders = l
      },
        err => this.handleError(err));
  }



  private handleError(err: any) {
    console.log("Response Error, Status:", err.status);
    console.log("Response Error, Status Text:", err.statusText);
    console.log(err);
  }


}