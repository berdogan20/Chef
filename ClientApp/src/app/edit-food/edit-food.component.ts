import { Component, OnInit } from '@angular/core';
import { FoodService, OrderService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodRm, OrderDto, FoodDto } from '../api/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent {

  foodId: string = 'not loaded';
  food: FoodRm = {};

  form!: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [this.food.name, Validators.required],
      description: [this.food.description, Validators.required],
      price: [this.food.price, Validators.required],
      preperationTime: [this.food.preperationTime]
    });

    this.route.paramMap
      .subscribe(p => this.findFood(p.get("foodId")))
  }

  saveChanges() {
    console.log(this.form);

    let dto = {
      description: this.form.value.description,
      id: this.foodId,
      imageUrl: this.food.imageUrl,
      name: this.form.value.name,
      preperationTime: Number(this.form.value.preperationTime),
      price: Number(this.form.value.price)
    }

    this.foodService.editFood({ id: this.foodId, body: dto })
      .subscribe(
        (_) => { },
        (err) => this.handleError(err)
      );

    this.router.navigate(['/menu']);
  }

  deleteFood() {
    this.foodService.deleteFood({ id: this.foodId })
      .subscribe(_ => { },
        err => this.handleError(err));
    this.router.navigate(['/menu']);
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



}
