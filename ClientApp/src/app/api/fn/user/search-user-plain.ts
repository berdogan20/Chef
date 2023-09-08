/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRm } from '../../models/user-rm';

export interface SearchUser$Plain$Params {
}

export function searchUser$Plain(http: HttpClient, rootUrl: string, params?: SearchUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
  const rb = new RequestBuilder(rootUrl, searchUser$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserRm>>;
    })
  );
}

searchUser$Plain.PATH = '/User';
