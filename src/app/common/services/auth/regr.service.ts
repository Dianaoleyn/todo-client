import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../common/api.service';
import {TodoHttpParams} from '../common/interfaces/http-params.interface';
import {Auth} from '../common/interfaces/auth.interface';
import {ApiResponse} from '../common/interfaces/api-response.interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Regr {
  private _localEnvironment: string = 'api/Members';
  private _isAuthorized: boolean = false;
  private _userData$$: BehaviorSubject<Auth> = new BehaviorSubject<Auth>(null);
  public userData$: Observable<Auth> = this._userData$$.asObservable();

  public get cachedUserData(): Auth {
    return this._userData$$.value;
  }

  public get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  constructor(
    private _http: HttpClient,
    private _api: ApiService
  ) {}

  public identity(login: string): Promise<ApiResponse<Auth>> {
    return this._api.post<Auth>(this._localEnvironment, {login})
      .toPromise()
      .then(this._updateUserConfigs);
  }

  public authentication(login: string): Promise<ApiResponse<Auth>> {
    const params: TodoHttpParams = {login};

    return this._api.get<Auth>(`${this._localEnvironment}/Auth`, params)
      .toPromise()
      .then(this._updateUserConfigs);
  }

  private _updateUserConfigs = (response: ApiResponse<Auth>): ApiResponse<Auth> => {
    if (response.success) {
      this._api.setToken(response.result.token);
      this._userData$$.next(response.result);
      this._isAuthorized = true;
    }
    return response;
  }
}
