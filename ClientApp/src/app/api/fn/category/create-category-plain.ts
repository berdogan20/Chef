/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryDto } from '../../models/category-dto';
import { CategoryRm } from '../../models/category-rm';

export interface CreateCategory$Plain$Params {
      body?: CategoryDto
}

export function createCategory$Plain(http: HttpClient, rootUrl: string, params?: CreateCategory$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
  const rb = new RequestBuilder(rootUrl, createCategory$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

createCategory$Plain.PATH = '/Category';
