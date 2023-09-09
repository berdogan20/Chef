/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodDto } from '../../models/food-dto';
import { FoodRm } from '../../models/food-rm';

export interface EditFood$Plain$Params {
  id: string;
      body?: FoodDto
}

export function editFood$Plain(http: HttpClient, rootUrl: string, params: EditFood$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FoodRm>> {
  const rb = new RequestBuilder(rootUrl, editFood$Plain.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FoodRm>;
    })
  );
}

editFood$Plain.PATH = '/Food/{id}';
