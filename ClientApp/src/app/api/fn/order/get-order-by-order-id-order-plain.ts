/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface GetOrderByOrderIdOrder$Plain$Params {
  orderId: string;
}

export function getOrderByOrderIdOrder$Plain(http: HttpClient, rootUrl: string, params: GetOrderByOrderIdOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
  const rb = new RequestBuilder(rootUrl, getOrderByOrderIdOrder$Plain.PATH, 'get');
  if (params) {
    rb.path('orderId', params.orderId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderRm>;
    })
  );
}

getOrderByOrderIdOrder$Plain.PATH = '/Order/byOrderId/{orderId}';
