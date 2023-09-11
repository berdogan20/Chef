import { Component, OnInit } from '@angular/core';
import { CategoryService, FoodService, OrderService, UserService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodRm, OrderDto, OrderItem } from '../api/models';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-buy-food',
  templateUrl: './buy-food.component.html',
  styleUrls: ['./buy-food.component.css']
})
export class BuyFoodComponent {

  foodId: string = 'not loaded';
  food: FoodRm = {};
  category: string = "";


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private userService: UserService,
    private categoryService: CategoryService,
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
        food => {
          this.food = food
          this.getCategory(this.food.categoryId!);
        },
        err => this.handleError(err)
      );
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

  addToBasket() {

    if (this.form.invalid)
      return;


    const orderItem: OrderItem = {
      amount: this.form.get('number')?.value!,
      foodItemId: this.food.id,
      orderItemId: uuidv4().toString(),
      price: this.food.price
    }


    console.log(orderItem);

    this.userService.addToBasketUser({ email: this.authService.currentUser?.email!, body: orderItem })
      .subscribe(_ => {
        this.router.navigate(['/basket']);
      },
        err => this.handleError(err));  
  }

  get number() {
    return this.form.controls.number
  }

  getCategory(id: number) {
    this.categoryService.findCategory({ id: id })
      .subscribe(rm => this.category = rm.name!,
        err => this.handleError(err));
  }
}
