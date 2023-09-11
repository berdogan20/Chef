/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getOrderItemsOrderItem } from '../fn/order-item/get-order-items-order-item';
import { GetOrderItemsOrderItem$Params } from '../fn/order-item/get-order-items-order-item';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOrderItemsOrderItem()` */
  static readonly GetOrderItemsOrderItemPath = '/OrderItem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderItemsOrderItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrderItem$Response(params?: GetOrderItemsOrderItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getOrderItemsOrderItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderItemsOrderItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderItemsOrderItem(params?: GetOrderItemsOrderItem$Params, context?: HttpContext): Observable<void> {
    return this.getOrderItemsOrderItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
