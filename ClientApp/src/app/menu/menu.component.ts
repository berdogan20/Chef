import { Component } from '@angular/core';
import { FoodService } from './../api/services/food.service';
import { FoodRm } from '../api/models';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  searchResult: FoodRm[] = [];

  constructor(private foodService: FoodService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.search();
  }

  isUser() {
    return this.authService.currentUser != null && this.authService.admin == false;
  }

  isAdmin() {
    return this.authService.admin;
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
