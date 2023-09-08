/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRm } from '../../models/user-rm';

export interface FindUser$Params {
  email: string;
}

export function findUser(http: HttpClient, rootUrl: string, params: FindUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRm>> {
  const rb = new RequestBuilder(rootUrl, findUser.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserRm>;
    })
  );
}

findUser.PATH = '/User/{email}';
