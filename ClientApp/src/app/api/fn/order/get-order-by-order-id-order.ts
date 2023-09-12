/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface GetOrderByOrderIdOrder$Params {
  orderId: string;
}

export function getOrderByOrderIdOrder(http: HttpClient, rootUrl: string, params: GetOrderByOrderIdOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
  const rb = new RequestBuilder(rootUrl, getOrderByOrderIdOrder.PATH, 'get');
  if (params) {
    rb.path('orderId', params.orderId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderRm>;
    })
  );
}

getOrderByOrderIdOrder.PATH = '/Order/byOrderId/{orderId}';
