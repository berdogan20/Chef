/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBasketItemBasketItem } from '../fn/basket-item/add-basket-item-basket-item';
import { AddBasketItemBasketItem$Params } from '../fn/basket-item/add-basket-item-basket-item';
import { BasketItem } from '../models/basket-item';
import { deleteBasketItemsByEmailBasketItem } from '../fn/basket-item/delete-basket-items-by-email-basket-item';
import { DeleteBasketItemsByEmailBasketItem$Params } from '../fn/basket-item/delete-basket-items-by-email-basket-item';
import { getBasketItemsBasketItem } from '../fn/basket-item/get-basket-items-basket-item';
import { GetBasketItemsBasketItem$Params } from '../fn/basket-item/get-basket-items-basket-item';
import { getBasketItemsBasketItem$Plain } from '../fn/basket-item/get-basket-items-basket-item-plain';
import { GetBasketItemsBasketItem$Plain$Params } from '../fn/basket-item/get-basket-items-basket-item-plain';
import { removeBasketItemBasketItem } from '../fn/basket-item/remove-basket-item-basket-item';
import { RemoveBasketItemBasketItem$Params } from '../fn/basket-item/remove-basket-item-basket-item';

@Injectable({ providedIn: 'root' })
export class BasketItemService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addBasketItemBasketItem()` */
  static readonly AddBasketItemBasketItemPath = '/BasketItem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBasketItemBasketItem()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addBasketItemBasketItem$Response(params?: AddBasketItemBasketItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addBasketItemBasketItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBasketItemBasketItem$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addBasketItemBasketItem(params?: AddBasketItemBasketItem$Params, context?: HttpContext): Observable<void> {
    return this.addBasketItemBasketItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `removeBasketItemBasketItem()` */
  static readonly RemoveBasketItemBasketItemPath = '/BasketItem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeBasketItemBasketItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeBasketItemBasketItem$Response(params?: RemoveBasketItemBasketItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeBasketItemBasketItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeBasketItemBasketItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeBasketItemBasketItem(params?: RemoveBasketItemBasketItem$Params, context?: HttpContext): Observable<void> {
    return this.removeBasketItemBasketItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getBasketItemsBasketItem()` */
  static readonly GetBasketItemsBasketItemPath = '/BasketItem/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBasketItemsBasketItem$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBasketItemsBasketItem$Plain$Response(params: GetBasketItemsBasketItem$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BasketItem>>> {
    return getBasketItemsBasketItem$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBasketItemsBasketItem$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBasketItemsBasketItem$Plain(params: GetBasketItemsBasketItem$Plain$Params, context?: HttpContext): Observable<Array<BasketItem>> {
    return this.getBasketItemsBasketItem$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BasketItem>>): Array<BasketItem> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBasketItemsBasketItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBasketItemsBasketItem$Response(params: GetBasketItemsBasketItem$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BasketItem>>> {
    return getBasketItemsBasketItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBasketItemsBasketItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBasketItemsBasketItem(params: GetBasketItemsBasketItem$Params, context?: HttpContext): Observable<Array<BasketItem>> {
    return this.getBasketItemsBasketItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BasketItem>>): Array<BasketItem> => r.body)
    );
  }

  /** Path part for operation `deleteBasketItemsByEmailBasketItem()` */
  static readonly DeleteBasketItemsByEmailBasketItemPath = '/BasketItem/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBasketItemsByEmailBasketItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBasketItemsByEmailBasketItem$Response(params: DeleteBasketItemsByEmailBasketItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBasketItemsByEmailBasketItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBasketItemsByEmailBasketItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBasketItemsByEmailBasketItem(params: DeleteBasketItemsByEmailBasketItem$Params, context?: HttpContext): Observable<void> {
    return this.deleteBasketItemsByEmailBasketItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
