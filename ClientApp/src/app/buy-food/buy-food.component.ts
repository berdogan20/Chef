import { Component, OnInit } from '@angular/core';
import { FoodService, OrderService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodRm, OrderDto } from '../api/models';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-buy-food',
  templateUrl: './buy-food.component.html',
  styleUrls: ['./buy-food.component.css']
})
export class BuyFoodComponent implements OnInit {

  foodId: string = 'not loaded';
  food: FoodRm = {};


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private fb: FormBuilder  ) { }


  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])]
  })

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(p => this.findFood(p.get("foodId")))
  }

  private findFood = (foodId: string | null) => {
    this.foodId = foodId ?? 'not passed';

    this.foodService.findFood({ id: this.foodId })
      .subscribe(
        food => this.food = food,
        err => this.handleError(err)
      );

    console.log(this.foodId)
   }

  private handleError = (err: any) => {

    if (err.status == 404) {
      alert("Food not found!")
      this.router.navigate(['/menu'])
    }


    if (err.status == 409) {
      console.log("err: " + err);
      alert(JSON.parse(err.error).message)
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

  buy() {

    if (this.form.invalid)
      return;

      // I will use Dto
      // because it will be a post operation

    const order: OrderDto = {
      address: this.authService.currentUser?.address!,
      amount: this.form.get('number')?.value!,
      foodId: this.food.id,
      orderId: Date.now().toString(), // Using current timestamp as orderId
      orderOwner: this.authService.currentUser?.email!,
      status: "Your order has been received."
    }

    console.log(order);

    this.orderService.buyOrder({ body: order })
      .subscribe(
        _ => this.router.navigate(['/my-orders']),
        err => this.handleError(err)
      );

  
  }

  get number() {
    return this.form.controls.number
  }
}
