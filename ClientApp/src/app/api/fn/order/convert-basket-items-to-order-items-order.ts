/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderDto } from '../../models/order-dto';

export interface ConvertBasketItemsToOrderItemsOrder$Params {
  email?: string;
      body?: OrderDto
}

export function convertBasketItemsToOrderItemsOrder(http: HttpClient, rootUrl: string, params?: ConvertBasketItemsToOrderItemsOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, convertBasketItemsToOrderItemsOrder.PATH, 'post');
  if (params) {
    rb.query('email', params.email, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

convertBasketItemsToOrderItemsOrder.PATH = '/Order/convert';
