/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface ListOrder$Params {
  email: string;
}

export function listOrder(http: HttpClient, rootUrl: string, params: ListOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
  const rb = new RequestBuilder(rootUrl, listOrder.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderRm>>;
    })
  );
}

listOrder.PATH = '/Order/list/{email}';
