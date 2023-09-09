/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodDto } from '../../models/food-dto';
import { FoodRm } from '../../models/food-rm';

export interface EditFood$Params {
  id: string;
      body?: FoodDto
}

export function editFood(http: HttpClient, rootUrl: string, params: EditFood$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
  const rb = new RequestBuilder(rootUrl, editFood.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FoodRm>;
    })
  );
}

editFood.PATH = '/Food/{id}';
