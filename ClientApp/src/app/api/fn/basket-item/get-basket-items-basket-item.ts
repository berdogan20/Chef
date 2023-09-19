/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BasketItem } from '../../models/basket-item';

export interface GetBasketItemsBasketItem$Params {
  email: string;
}

export function getBasketItemsBasketItem(http: HttpClient, rootUrl: string, params: GetBasketItemsBasketItem$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BasketItem>>> {
  const rb = new RequestBuilder(rootUrl, getBasketItemsBasketItem.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BasketItem>>;
    })
  );
}

getBasketItemsBasketItem.PATH = '/BasketItem/{email}';
