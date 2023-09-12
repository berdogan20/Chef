/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderItem } from '../../models/order-item';

export interface GetOrderItemsOrder$Plain$Params {
  orderId: string;
}

export function getOrderItemsOrder$Plain(http: HttpClient, rootUrl: string, params: GetOrderItemsOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderItem>>> {
  const rb = new RequestBuilder(rootUrl, getOrderItemsOrder$Plain.PATH, 'get');
  if (params) {
    rb.path('orderId', params.orderId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderItem>>;
    })
  );
}

getOrderItemsOrder$Plain.PATH = '/Order/{orderId}/items';
