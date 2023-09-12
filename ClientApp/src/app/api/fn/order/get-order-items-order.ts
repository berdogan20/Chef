/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderItem } from '../../models/order-item';

export interface GetOrderItemsOrder$Params {
  orderId: string;
}

export function getOrderItemsOrder(http: HttpClient, rootUrl: string, params: GetOrderItemsOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderItem>>> {
  const rb = new RequestBuilder(rootUrl, getOrderItemsOrder.PATH, 'get');
  if (params) {
    rb.path('orderId', params.orderId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderItem>>;
    })
  );
}

getOrderItemsOrder.PATH = '/Order/{orderId}/items';
