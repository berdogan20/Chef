/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface FindOrder$Plain$Params {
  email: string;
}

export function findOrder$Plain(http: HttpClient, rootUrl: string, params: FindOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderRm>> {
  const rb = new RequestBuilder(rootUrl, findOrder$Plain.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
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

findOrder$Plain.PATH = '/Order/{email}';
