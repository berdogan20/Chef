/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatusRm } from '../../models/status-rm';

export interface GetAllStatusesStatus$Plain$Params {
}

export function getAllStatusesStatus$Plain(http: HttpClient, rootUrl: string, params?: GetAllStatusesStatus$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StatusRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllStatusesStatus$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StatusRm>>;
    })
  );
}

getAllStatusesStatus$Plain.PATH = '/Status/all';
