/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderItemDto } from '../../models/order-item-dto';

export interface ChangeOrderIdOrderItem$Params {
  newOrderId?: string;
      body?: OrderItemDto
}

export function changeOrderIdOrderItem(http: HttpClient, rootUrl: string, params?: ChangeOrderIdOrderItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, changeOrderIdOrderItem.PATH, 'post');
  if (params) {
    rb.query('newOrderId', params.newOrderId, {});
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

changeOrderIdOrderItem.PATH = '/OrderItem/ChangeOrderId';
