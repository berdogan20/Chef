import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderRm, FoodRm, OrderItem, OrderDto, StatusRm } from '../api/models';
import { FoodService, OrderService, StatusService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrls: ['./order-detail-admin.component.css']
})
export class OrderDetailAdminComponent implements OnInit, OnDestroy {

  orderId: string = 'not loaded';
  order: OrderRm = {};
  orderItems: OrderItem[] = [];
  foods: FoodRm[] = [];
  private subscriptions: Subscription[] = [];
  orderStatus!: number; // Variable to store the selected order statu

  statuses: string[] = ["", "Your order has been received",
    "Preparing", "On the Way", "Delivered"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get("orderId");
      this.findOrder(orderId);
      console.log("OrderId: " + this.orderId);
    },
      err => this.handleError("order-detail 34 " + err));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  private findOrder(orderId: string | null): void {
    if (!orderId) {
      console.error("orderId is null or undefined.");
      return;
    }

    this.orderId = orderId;

    const getOrderSubscription = this.orderService.getOrderByOrderIdOrder({ orderId }).subscribe(
      order => {
        this.order = order;
        console.log("Order: ");
        console.log(this.order);
        this.loadOrderItemsAndFoods(order);
      }, err => this.handleError("order-detail 55 " + err)
    );

    this.subscriptions.push(getOrderSubscription);
  }

  private loadOrderItemsAndFoods(order: OrderRm): void {
    if (!order || !order.orderId) {
      console.error("Invalid order or orderId.");
      return;
    }

    const getOrderItemsSubscription = this.orderService.getOrderItemsOrder({ orderId: order.orderId }).subscribe(
      orderItems => {
        this.orderItems = orderItems;
        console.log("Order items: ");
        console.log(orderItems);
        const foodObservables = orderItems.map(orderItem =>
          this.foodService.findFood({ id: orderItem.foodItemId! })
        );

        const forkJoinSubscription = forkJoin(foodObservables).subscribe(
          foods => {
            this.foods = foods;
            console.log("Hello");
            console.log(foods);
          },
          err => this.handleError("order-detail 83 " + err)
        );

        this.subscriptions.push(getOrderItemsSubscription, forkJoinSubscription);
      },
      err => this.handleError("order-detail 89 " + err)
    );
  }

  private handleError(err: any): void {
    if (err.status == 404) {
      alert("Order not found!");
      this.router.navigate(['/orders']);
    }

    if (err.status == 409) {
      console.error("Error: ", err);
      alert(JSON.parse(err.error).message);
    }

    console.log("Response Error. Status: ", err.status);
    console.log("Response Error. Status Text: ", err.statusText);
    console.error(err);
  }

  changeStatus() {
    this.orderService.updateOrderStatusOrder({
      orderId: this.orderId, body: {
        address: this.order.address,
        orderDate: this.order.orderDate,
        orderId: this.order.orderId,
        orderItems: this.order.orderItems,
        orderOwner: this.order.orderOwner,
        statusId: this.orderStatus ?? this.order.statusId,
        totalPayment: this.order.totalPayment
      }
    })
      .subscribe(rm => {
        console.log(rm);
      }, err => this.handleError(err));
  }
}
