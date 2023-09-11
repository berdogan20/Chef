/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodRm } from '../../models/food-rm';

export interface GetByCategoryIdFood$Params {
  categoryId: number;
}

export function getByCategoryIdFood(http: HttpClient, rootUrl: string, params: GetByCategoryIdFood$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FoodRm>>> {
  const rb = new RequestBuilder(rootUrl, getByCategoryIdFood.PATH, 'get');
  if (params) {
    rb.path('categoryId', params.categoryId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FoodRm>>;
    })
  );
}

getByCategoryIdFood.PATH = '/Food/byCategory/{categoryId}';
