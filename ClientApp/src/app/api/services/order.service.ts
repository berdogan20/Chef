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
import { convertBasketItemsToOrderItemsOrder } from '../fn/order/convert-basket-items-to-order-items-order';
import { ConvertBasketItemsToOrderItemsOrder$Params } from '../fn/order/convert-basket-items-to-order-items-order';
import { findOrder } from '../fn/order/find-order';
import { FindOrder$Params } from '../fn/order/find-order';
import { findOrder$Plain } from '../fn/order/find-order-plain';
import { FindOrder$Plain$Params } from '../fn/order/find-order-plain';
import { getOrderByOrderIdOrder } from '../fn/order/get-order-by-order-id-order';
import { GetOrderByOrderIdOrder$Params } from '../fn/order/get-order-by-order-id-order';
import { getOrderByOrderIdOrder$Plain } from '../fn/order/get-order-by-order-id-order-plain';
import { GetOrderByOrderIdOrder$Plain$Params } from '../fn/order/get-order-by-order-id-order-plain';
import { getOrderItemsOrder } from '../fn/order/get-order-items-order';
import { GetOrderItemsOrder$Params } from '../fn/order/get-order-items-order';
import { getOrderItemsOrder$Plain } from '../fn/order/get-order-items-order-plain';
import { GetOrderItemsOrder$Plain$Params } from '../fn/order/get-order-items-order-plain';
import { listOrder } from '../fn/order/list-order';
import { ListOrder$Params } from '../fn/order/list-order';
import { listOrder$Plain } from '../fn/order/list-order-plain';
import { ListOrder$Plain$Params } from '../fn/order/list-order-plain';
import { OrderItem } from '../models/order-item';
import { OrderRm } from '../models/order-rm';
import { searchOrder } from '../fn/order/search-order';
import { SearchOrder$Params } from '../fn/order/search-order';
import { searchOrder$Plain } from '../fn/order/search-order-plain';
import { SearchOrder$Plain$Params } from '../fn/order/search-order-plain';
import { updateOrderStatusOrder } from '../fn/order/update-order-status-order';
import { UpdateOrderStatusOrder$Params } from '../fn/order/update-order-status-order';

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

  /** Path part for operation `listOrder()` */
  static readonly ListOrderPath = '/Order/list/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrder$Plain$Response(params: ListOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return listOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrder$Plain(params: ListOrder$Plain$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.listOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrder$Response(params: ListOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return listOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrder(params: ListOrder$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.listOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /** Path part for operation `findOrder()` */
  static readonly FindOrderPath = '/Order/{email}';

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

  /** Path part for operation `getOrderItemsOrder()` */
  static readonly GetOrderItemsOrderPath = '/Order/{orderId}/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderItemsOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrder$Plain$Response(params: GetOrderItemsOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderItem>>> {
    return getOrderItemsOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderItemsOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrder$Plain(params: GetOrderItemsOrder$Plain$Params, context?: HttpContext): Observable<Array<OrderItem>> {
    return this.getOrderItemsOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderItem>>): Array<OrderItem> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderItemsOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrder$Response(params: GetOrderItemsOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderItem>>> {
    return getOrderItemsOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderItemsOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrder(params: GetOrderItemsOrder$Params, context?: HttpContext): Observable<Array<OrderItem>> {
    return this.getOrderItemsOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderItem>>): Array<OrderItem> => r.body)
    );
  }

  /** Path part for operation `getOrderByOrderIdOrder()` */
  static readonly GetOrderByOrderIdOrderPath = '/Order/byOrderId/{orderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderByOrderIdOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderByOrderIdOrder$Plain$Response(params: GetOrderByOrderIdOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
    return getOrderByOrderIdOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderByOrderIdOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderByOrderIdOrder$Plain(params: GetOrderByOrderIdOrder$Plain$Params, context?: HttpContext): Observable<OrderRm> {
    return this.getOrderByOrderIdOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderRm>): OrderRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderByOrderIdOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderByOrderIdOrder$Response(params: GetOrderByOrderIdOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
    return getOrderByOrderIdOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderByOrderIdOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderByOrderIdOrder(params: GetOrderByOrderIdOrder$Params, context?: HttpContext): Observable<OrderRm> {
    return this.getOrderByOrderIdOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderRm>): OrderRm => r.body)
    );
  }

  /** Path part for operation `updateOrderStatusOrder()` */
  static readonly UpdateOrderStatusOrderPath = '/Order/{orderId}/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrderStatusOrder()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateOrderStatusOrder$Response(params: UpdateOrderStatusOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateOrderStatusOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOrderStatusOrder$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateOrderStatusOrder(params: UpdateOrderStatusOrder$Params, context?: HttpContext): Observable<void> {
    return this.updateOrderStatusOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `convertBasketItemsToOrderItemsOrder()` */
  static readonly ConvertBasketItemsToOrderItemsOrderPath = '/Order/convert';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `convertBasketItemsToOrderItemsOrder()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  convertBasketItemsToOrderItemsOrder$Response(params?: ConvertBasketItemsToOrderItemsOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return convertBasketItemsToOrderItemsOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `convertBasketItemsToOrderItemsOrder$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  convertBasketItemsToOrderItemsOrder(params?: ConvertBasketItemsToOrderItemsOrder$Params, context?: HttpContext): Observable<void> {
    return this.convertBasketItemsToOrderItemsOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
