/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CategoryRm } from '../models/category-rm';
import { createCategory } from '../fn/category/create-category';
import { CreateCategory$Params } from '../fn/category/create-category';
import { createCategory$Plain } from '../fn/category/create-category-plain';
import { CreateCategory$Plain$Params } from '../fn/category/create-category-plain';
import { findCategory } from '../fn/category/find-category';
import { FindCategory$Params } from '../fn/category/find-category';
import { findCategory$Plain } from '../fn/category/find-category-plain';
import { FindCategory$Plain$Params } from '../fn/category/find-category-plain';
import { getAllCategoriesCategory } from '../fn/category/get-all-categories-category';
import { GetAllCategoriesCategory$Params } from '../fn/category/get-all-categories-category';
import { getAllCategoriesCategory$Plain } from '../fn/category/get-all-categories-category-plain';
import { GetAllCategoriesCategory$Plain$Params } from '../fn/category/get-all-categories-category-plain';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findCategory()` */
  static readonly FindCategoryPath = '/Category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategory$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategory$Plain$Response(params: FindCategory$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
    return findCategory$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategory$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategory$Plain(params: FindCategory$Plain$Params, context?: HttpContext): Observable<CategoryRm> {
    return this.findCategory$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryRm>): CategoryRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategory$Response(params: FindCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
    return findCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategory(params: FindCategory$Params, context?: HttpContext): Observable<CategoryRm> {
    return this.findCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryRm>): CategoryRm => r.body)
    );
  }

  /** Path part for operation `getAllCategoriesCategory()` */
  static readonly GetAllCategoriesCategoryPath = '/Category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategoriesCategory$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategoriesCategory$Plain$Response(params?: GetAllCategoriesCategory$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryRm>>> {
    return getAllCategoriesCategory$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategoriesCategory$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategoriesCategory$Plain(params?: GetAllCategoriesCategory$Plain$Params, context?: HttpContext): Observable<Array<CategoryRm>> {
    return this.getAllCategoriesCategory$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryRm>>): Array<CategoryRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategoriesCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategoriesCategory$Response(params?: GetAllCategoriesCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryRm>>> {
    return getAllCategoriesCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategoriesCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategoriesCategory(params?: GetAllCategoriesCategory$Params, context?: HttpContext): Observable<Array<CategoryRm>> {
    return this.getAllCategoriesCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryRm>>): Array<CategoryRm> => r.body)
    );
  }

  /** Path part for operation `createCategory()` */
  static readonly CreateCategoryPath = '/Category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCategory$Plain$Response(params?: CreateCategory$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
    return createCategory$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCategory$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCategory$Plain(params?: CreateCategory$Plain$Params, context?: HttpContext): Observable<CategoryRm> {
    return this.createCategory$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryRm>): CategoryRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCategory$Response(params?: CreateCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryRm>> {
    return createCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCategory$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCategory(params?: CreateCategory$Params, context?: HttpContext): Observable<CategoryRm> {
    return this.createCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryRm>): CategoryRm => r.body)
    );
  }

}
