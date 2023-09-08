/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { buyOrder } from '../fn/order/buy-order';
import { BuyOrder$Params } from '../fn/order/buy-order';
import { findOrder } from '../fn/order/find-order';
import { FindOrder$Params } from '../fn/order/find-order';
import { findOrder$Plain } from '../fn/order/find-order-plain';
import { FindOrder$Plain$Params } from '../fn/order/find-order-plain';
import { OrderRm } from '../models/order-rm';
import { searchOrder } from '../fn/order/search-order';
import { SearchOrder$Params } from '../fn/order/search-order';
import { searchOrder$Plain } from '../fn/order/search-order-plain';
import { SearchOrder$Plain$Params } from '../fn/order/search-order-plain';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchOrder()` */
  static readonly SearchOrderPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOrder$Plain$Response(params?: SearchOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return searchOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOrder$Plain(params?: SearchOrder$Plain$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.searchOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOrder$Response(params?: SearchOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return searchOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOrder(params?: SearchOrder$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.searchOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /** Path part for operation `buyOrder()` */
  static readonly BuyOrderPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buyOrder()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  buyOrder$Response(params?: BuyOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return buyOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `buyOrder$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  buyOrder(params?: BuyOrder$Params, context?: HttpContext): Observable<void> {
    return this.buyOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findOrder()` */
  static readonly FindOrderPath = '/Order/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrder$Plain$Response(params: FindOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
    return findOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrder$Plain(params: FindOrder$Plain$Params, context?: HttpContext): Observable<OrderRm> {
    return this.findOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderRm>): OrderRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrder$Response(params: FindOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
    return findOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrder(params: FindOrder$Params, context?: HttpContext): Observable<OrderRm> {
    return this.findOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderRm>): OrderRm => r.body)
    );
  }

}
