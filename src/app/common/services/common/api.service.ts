import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, finalize} from 'rxjs/operators';
import {ApiResponse} from './interfaces/api-response.interface';
import {TodoHttpParams} from './interfaces/http-params.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _host: string = environment.host;
  private _headers: HttpHeaders;
  private _progressBarState$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public progressBarState$: Observable<boolean> = this._progressBarState$$.asObservable();


  constructor(
    private _http: HttpClient
  ) {}

  public setToken(token: string): void {
    this._headers = new HttpHeaders({Authorization: 'Bearer ' + token});
  }

  public get<T>(url: string, params?: TodoHttpParams): Observable<ApiResponse<T>> {
    this._progressBarState$$.next(true);
    return this._http.get(this._host + url, {headers: this._headers, params}).pipe(
      this._catchAndReturnNull.bind(this),
      finalize(() => this._progressBarState$$.next(false))
    );
  }

  public post<T>(url: string, body: any, params?: TodoHttpParams): Observable<ApiResponse<T>> {
    return this._http.post(this._host + url, body, {headers: this._headers, params}).pipe(
      this._catchAndReturnNull.bind(this),
      finalize(() => this._progressBarState$$.next(false))
    );
  }

  public delete<T>(url: string, params?: TodoHttpParams): Observable<ApiResponse<T>> {
    return this._http.delete(this._host + url, {headers: this._headers, params}).pipe(
      this._catchAndReturnNull.bind(this),
      finalize(() => this._progressBarState$$.next(false))
    );
  }


  private _catchAndReturnNull<T>(source: Observable<T>): Observable<any> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      })
    );
  }

}
