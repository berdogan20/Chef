/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatusRm } from '../../models/status-rm';

export interface GetStatusByIdStatus$Params {
  id: number;
}

export function getStatusByIdStatus(http: HttpClient, rootUrl: string, params: GetStatusByIdStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<StatusRm>> {
  const rb = new RequestBuilder(rootUrl, getStatusByIdStatus.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatusRm>;
    })
  );
}

getStatusByIdStatus.PATH = '/Status/{id}';
