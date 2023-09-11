/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createFood } from '../fn/food/create-food';
import { CreateFood$Params } from '../fn/food/create-food';
import { createFood$Plain } from '../fn/food/create-food-plain';
import { CreateFood$Plain$Params } from '../fn/food/create-food-plain';
import { deleteFood } from '../fn/food/delete-food';
import { DeleteFood$Params } from '../fn/food/delete-food';
import { editFood } from '../fn/food/edit-food';
import { EditFood$Params } from '../fn/food/edit-food';
import { editFood$Plain } from '../fn/food/edit-food-plain';
import { EditFood$Plain$Params } from '../fn/food/edit-food-plain';
import { findFood } from '../fn/food/find-food';
import { FindFood$Params } from '../fn/food/find-food';
import { findFood$Plain } from '../fn/food/find-food-plain';
import { FindFood$Plain$Params } from '../fn/food/find-food-plain';
import { FoodRm } from '../models/food-rm';
import { getByCategoryIdFood } from '../fn/food/get-by-category-id-food';
import { GetByCategoryIdFood$Params } from '../fn/food/get-by-category-id-food';
import { getByCategoryIdFood$Plain } from '../fn/food/get-by-category-id-food-plain';
import { GetByCategoryIdFood$Plain$Params } from '../fn/food/get-by-category-id-food-plain';
import { searchFood } from '../fn/food/search-food';
import { SearchFood$Params } from '../fn/food/search-food';
import { searchFood$Plain } from '../fn/food/search-food-plain';
import { SearchFood$Plain$Params } from '../fn/food/search-food-plain';

@Injectable({ providedIn: 'root' })
export class FoodService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchFood()` */
  static readonly SearchFoodPath = '/Food';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFood$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFood$Plain$Response(params?: SearchFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FoodRm>>> {
    return searchFood$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFood$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFood$Plain(params?: SearchFood$Plain$Params, context?: HttpContext): Observable<Array<FoodRm>> {
    return this.searchFood$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FoodRm>>): Array<FoodRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFood()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFood$Response(params?: SearchFood$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FoodRm>>> {
    return searchFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFood$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFood(params?: SearchFood$Params, context?: HttpContext): Observable<Array<FoodRm>> {
    return this.searchFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FoodRm>>): Array<FoodRm> => r.body)
    );
  }

  /** Path part for operation `createFood()` */
  static readonly CreateFoodPath = '/Food';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFood$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFood$Plain$Response(params?: CreateFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return createFood$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFood$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFood$Plain(params?: CreateFood$Plain$Params, context?: HttpContext): Observable<FoodRm> {
    return this.createFood$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFood()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFood$Response(params?: CreateFood$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return createFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFood$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFood(params?: CreateFood$Params, context?: HttpContext): Observable<FoodRm> {
    return this.createFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /** Path part for operation `getByCategoryIdFood()` */
  static readonly GetByCategoryIdFoodPath = '/Food/byCategory/{categoryId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByCategoryIdFood$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCategoryIdFood$Plain$Response(params: GetByCategoryIdFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FoodRm>>> {
    return getByCategoryIdFood$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByCategoryIdFood$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCategoryIdFood$Plain(params: GetByCategoryIdFood$Plain$Params, context?: HttpContext): Observable<Array<FoodRm>> {
    return this.getByCategoryIdFood$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FoodRm>>): Array<FoodRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByCategoryIdFood()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCategoryIdFood$Response(params: GetByCategoryIdFood$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FoodRm>>> {
    return getByCategoryIdFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByCategoryIdFood$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCategoryIdFood(params: GetByCategoryIdFood$Params, context?: HttpContext): Observable<Array<FoodRm>> {
    return this.getByCategoryIdFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FoodRm>>): Array<FoodRm> => r.body)
    );
  }

  /** Path part for operation `findFood()` */
  static readonly FindFoodPath = '/Food/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFood$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFood$Plain$Response(params: FindFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return findFood$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFood$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFood$Plain(params: FindFood$Plain$Params, context?: HttpContext): Observable<FoodRm> {
    return this.findFood$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFood()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFood$Response(params: FindFood$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return findFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFood$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFood(params: FindFood$Params, context?: HttpContext): Observable<FoodRm> {
    return this.findFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /** Path part for operation `editFood()` */
  static readonly EditFoodPath = '/Food/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editFood$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editFood$Plain$Response(params: EditFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return editFood$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editFood$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editFood$Plain(params: EditFood$Plain$Params, context?: HttpContext): Observable<FoodRm> {
    return this.editFood$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editFood()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editFood$Response(params: EditFood$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
    return editFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editFood$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editFood(params: EditFood$Params, context?: HttpContext): Observable<FoodRm> {
    return this.editFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<FoodRm>): FoodRm => r.body)
    );
  }

  /** Path part for operation `deleteFood()` */
  static readonly DeleteFoodPath = '/Food/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFood()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFood$Response(params: DeleteFood$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFood(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFood$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFood(params: DeleteFood$Params, context?: HttpContext): Observable<void> {
    return this.deleteFood$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
