/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderItem } from '../../models/order-item';

export interface GetUserBasketUser$Params {
  email: string;
}

export function getUserBasketUser(http: HttpClient, rootUrl: string, params: GetUserBasketUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderItem>>> {
  const rb = new RequestBuilder(rootUrl, getUserBasketUser.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
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

getUserBasketUser.PATH = '/User/{email}/basket';
