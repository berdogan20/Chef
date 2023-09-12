/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatusRm } from '../../models/status-rm';

export interface GetAllStatusesStatus$Params {
}

export function getAllStatusesStatus(http: HttpClient, rootUrl: string, params?: GetAllStatusesStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StatusRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllStatusesStatus.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StatusRm>>;
    })
  );
}

getAllStatusesStatus.PATH = '/Status/all';
