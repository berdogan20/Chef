import { Component, OnInit } from '@angular/core';
import { FoodService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodRm } from '../api/models';


@Component({
  selector: 'app-buy-food',
  templateUrl: './buy-food.component.html',
  styleUrls: ['./buy-food.component.css']
})
export class BuyFoodComponent implements OnInit {

  foodId: string = 'not loaded';
  food: FoodRm = {};

  constructor(private route: ActivatedRoute,
    private foodService: FoodService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(p => this.findFood(p.get("foodId")))
  }

  private findFood = (foodId: string | null) => {
    this.foodId = foodId ?? 'not passed';

    this.foodService.findFood({ id: this.foodId })
      .subscribe(food => this.food = food,
        this.handleError)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      alert("Food not found!")
      //this.router.navigate(['/search-flights'])
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
