import { Component } from '@angular/core';
import { FoodService } from './../api/services/food.service';
import { CategoryRm, FoodRm } from '../api/models';
import { AuthService } from '../auth/auth.service';
import { CategoryService } from '../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  searchResult: FoodRm[] = [];
  categories: CategoryRm[] = [];
  category: string = "All";


  isAddingCategory: boolean = false;
  newCategoryName: string = '';

  constructor(private foodService: FoodService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.search();
    this.getCategories();
  }

  isUser() {
    return this.authService.currentUser != null && this.authService.admin == false;
  }

  isAdmin() {
    return this.authService.admin;
  }


  search() {
    this.foodService.searchFood()
      .subscribe(response => this.searchResult = response,
        this.handleError)
  }

  getCategories() {
    this.categoryService.getAllCategoriesCategory()
      .subscribe(rmList => this.categories = rmList,
        err => this.handleError(err));
  }

  private handleError(err: any) {

    console.log(err);
  }

  filterCategories(categoryId: number | null) {

    if (categoryId == null) {
      this.search();
    }
    else {
      this.foodService.getByCategoryIdFood({ categoryId: categoryId })
        .subscribe(response => this.searchResult = response,
          err => console.log(err));
    }

  }

  toggleAddCategoryMode() {
    this.isAddingCategory = !this.isAddingCategory;
    if (!this.isAddingCategory) {
      // Clear the input field when exiting "add mode"
      this.newCategoryName = '';
    }
  }

  saveNewCategory() {
    if (this.newCategoryName) {

      const newCategoryId = this.categories.length + 1;

      this.categoryService.createCategory({
        body: {
          id: newCategoryId,
          name: this.newCategoryName
        }
      })
        .subscribe(_ => {
          console.log(this.newCategoryName);
        }, err => this.handleError(err));
    }

    this.newCategoryName = '';
    this.toggleAddCategoryMode();
    this.router.navigate(['/menu'])
  }


   
}
