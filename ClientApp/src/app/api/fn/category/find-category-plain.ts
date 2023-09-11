/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryRm } from '../../models/category-rm';

export interface FindCategory$Plain$Params {
  id: number;
}

export function findCategory$Plain(http: HttpClient, rootUrl: string, params: FindCategory$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
  const rb = new RequestBuilder(rootUrl, findCategory$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CategoryRm>;
    })
  );
}

findCategory$Plain.PATH = '/Category/{id}';
