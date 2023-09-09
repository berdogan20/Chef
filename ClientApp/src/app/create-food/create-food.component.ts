import { Component, OnInit } from '@angular/core';
import { FoodService, OrderService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodRm, OrderDto, FoodDto } from '../api/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent {

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
      imageUrl: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      preperationTime: ['', Validators.required]
    });

  }

  createFood() {
    console.log(this.form);

    let dto: FoodDto = {
      description: this.form.value.description,
      id: uuidv4(),
      imageUrl: this.form.value.imageUrl,
      name: this.form.value.name,
      preperationTime: Number(this.form.value.preperationTime),
      price: Number(this.form.value.price)
    }


    this.foodService.createFood({ body: dto })
      .subscribe(_ => {
        this.router.navigate(['/menu']);
      },
        err => this.handleError(err));

    
  }


  cancel() {

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
