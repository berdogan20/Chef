/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findFood } from '../fn/food/find-food';
import { FindFood$Params } from '../fn/food/find-food';
import { findFood$Plain } from '../fn/food/find-food-plain';
import { FindFood$Plain$Params } from '../fn/food/find-food-plain';
import { FoodRm } from '../models/food-rm';
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

}
