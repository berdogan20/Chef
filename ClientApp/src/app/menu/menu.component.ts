import { Component } from '@angular/core';
import { FoodService } from './../api/services/food.service';
import { FoodRm } from '../api/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  searchResult: FoodRm[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.foodService.searchFood({})
      .subscribe(response => this.searchResult = response,
        this.handleError)
  }

  private handleError(err: any) {

    console.log(err);
  }
}
