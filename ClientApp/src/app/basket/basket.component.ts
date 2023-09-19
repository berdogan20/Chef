import { Component, OnInit } from '@angular/core';
import { OrderRm, FoodRm, OrderItem, UserRm, OrderDto, BasketItem } from '../api/models';
import { BasketItemService, CategoryService, FoodService, StatusService, UserService } from '../api/services';
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

  basket: BasketItem[] = [];
  foods: FoodRm[] = [];
  currentUser!: UserRm;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private userService: UserService,
    private statusService: StatusService,
    private basketItemService: BasketItemService) { }


  ngOnInit(): void {

    this.basketItemService.getBasketItemsBasketItem({ email: this.authService.currentUser?.email! })
      .subscribe(
        (basket) => {
          this.basket = basket;
          // Fetch food data for each order
          const foodObservables = basket.map((basketItem) =>
            this.foodService.findFood({ id: basketItem.foodId! })
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

    this.currentUser = this.authService.currentUser!;
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
      statusId: 1,
      totalPayment: this.getTotalPayment()
    }

    console.log(dto);

    this.orderService.buyOrder({ body: dto })
      .subscribe(_ => {
        this.orderService.convertBasketItemsToOrderItemsOrder({ email: this.authService.currentUser?.email!, body: dto })
          .subscribe(_ => {
            this.basket = [];
            this.router.navigate(['/order-detail', dto.orderId])
          }, err => this.handleError(err));
      }, err => this.handleError(err));


    
  }

  getTotalPayment(): number{
    let total = 0;
    for (let basketItem of this.basket) {
      total += basketItem.amount! * basketItem.price!;
    }
    return total;
  }

  remove(index: number) {

    let itemToRemove = this.basket[index];

    if (this.currentUser.email) {
      if (itemToRemove.basketItemId) {
        this.basketItemService.removeBasketItemBasketItem({ email: this.currentUser.email, foodId: itemToRemove.foodId! })
          .subscribe(
            _ => { },
            err => this.handleError(err)
          );
      }
    }

    this.basket.splice(index, 1);
    this.foods.splice(index, 1);
  }


}
