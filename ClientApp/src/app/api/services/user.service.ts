/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findUser } from '../fn/user/find-user';
import { FindUser$Params } from '../fn/user/find-user';
import { findUser$Plain } from '../fn/user/find-user-plain';
import { FindUser$Plain$Params } from '../fn/user/find-user-plain';
import { registerUser } from '../fn/user/register-user';
import { RegisterUser$Params } from '../fn/user/register-user';
import { searchUser } from '../fn/user/search-user';
import { SearchUser$Params } from '../fn/user/search-user';
import { searchUser$Plain } from '../fn/user/search-user-plain';
import { SearchUser$Plain$Params } from '../fn/user/search-user-plain';
import { UserRm } from '../models/user-rm';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchUser()` */
  static readonly SearchUserPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchUser$Plain$Response(params?: SearchUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
    return searchUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchUser$Plain(params?: SearchUser$Plain$Params, context?: HttpContext): Observable<Array<UserRm>> {
    return this.searchUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>): Array<UserRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchUser$Response(params?: SearchUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
    return searchUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchUser(params?: SearchUser$Params, context?: HttpContext): Observable<Array<UserRm>> {
    return this.searchUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>): Array<UserRm> => r.body)
    );
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerUser$Response(params?: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerUser(params?: RegisterUser$Params, context?: HttpContext): Observable<void> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findUser()` */
  static readonly FindUserPath = '/User/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Plain$Response(params: FindUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRm>> {
    return findUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Plain(params: FindUser$Plain$Params, context?: HttpContext): Observable<UserRm> {
    return this.findUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserRm>): UserRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Response(params: FindUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRm>> {
    return findUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser(params: FindUser$Params, context?: HttpContext): Observable<UserRm> {
    return this.findUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserRm>): UserRm => r.body)
    );
  }

}
