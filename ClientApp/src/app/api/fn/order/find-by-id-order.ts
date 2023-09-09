/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface FindByIdOrder$Params {
  id: string;
  status?: string;
}

export function findByIdOrder(http: HttpClient, rootUrl: string, params: FindByIdOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
  const rb = new RequestBuilder(rootUrl, findByIdOrder.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('status', params.status, {});
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

findByIdOrder.PATH = '/Order/{id}';
