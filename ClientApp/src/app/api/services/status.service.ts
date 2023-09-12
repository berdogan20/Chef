/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllStatusesStatus } from '../fn/status/get-all-statuses-status';
import { GetAllStatusesStatus$Params } from '../fn/status/get-all-statuses-status';
import { getAllStatusesStatus$Plain } from '../fn/status/get-all-statuses-status-plain';
import { GetAllStatusesStatus$Plain$Params } from '../fn/status/get-all-statuses-status-plain';
import { getStatusByIdStatus } from '../fn/status/get-status-by-id-status';
import { GetStatusByIdStatus$Params } from '../fn/status/get-status-by-id-status';
import { getStatusByIdStatus$Plain } from '../fn/status/get-status-by-id-status-plain';
import { GetStatusByIdStatus$Plain$Params } from '../fn/status/get-status-by-id-status-plain';
import { StatusRm } from '../models/status-rm';

@Injectable({ providedIn: 'root' })
export class StatusService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStatusByIdStatus()` */
  static readonly GetStatusByIdStatusPath = '/Status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatusByIdStatus$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusByIdStatus$Plain$Response(params: GetStatusByIdStatus$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<StatusRm>> {
    return getStatusByIdStatus$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatusByIdStatus$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusByIdStatus$Plain(params: GetStatusByIdStatus$Plain$Params, context?: HttpContext): Observable<StatusRm> {
    return this.getStatusByIdStatus$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatusRm>): StatusRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatusByIdStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusByIdStatus$Response(params: GetStatusByIdStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<StatusRm>> {
    return getStatusByIdStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatusByIdStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusByIdStatus(params: GetStatusByIdStatus$Params, context?: HttpContext): Observable<StatusRm> {
    return this.getStatusByIdStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatusRm>): StatusRm => r.body)
    );
  }

  /** Path part for operation `getAllStatusesStatus()` */
  static readonly GetAllStatusesStatusPath = '/Status/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStatusesStatus$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatusesStatus$Plain$Response(params?: GetAllStatusesStatus$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StatusRm>>> {
    return getAllStatusesStatus$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStatusesStatus$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatusesStatus$Plain(params?: GetAllStatusesStatus$Plain$Params, context?: HttpContext): Observable<Array<StatusRm>> {
    return this.getAllStatusesStatus$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StatusRm>>): Array<StatusRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStatusesStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatusesStatus$Response(params?: GetAllStatusesStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StatusRm>>> {
    return getAllStatusesStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStatusesStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatusesStatus(params?: GetAllStatusesStatus$Params, context?: HttpContext): Observable<Array<StatusRm>> {
    return this.getAllStatusesStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StatusRm>>): Array<StatusRm> => r.body)
    );
  }

}
