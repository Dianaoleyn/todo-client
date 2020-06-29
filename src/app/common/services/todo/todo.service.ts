import {Injectable} from '@angular/core';
import {ApiService} from '../common/api.service';
import {ApiResponse} from '../common/interfaces/api-response.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {TodoItem} from '../common/interfaces/todo-item';
import {Regr} from '../auth/regr.service';
import {TodoHttpParams} from '../common/interfaces/http-params.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _localEnvironment: string = 'api/Todo';

  private _todoList$$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  public todoList$: Observable<TodoItem[]> = this._todoList$$.asObservable();

  constructor(
    private _api: ApiService,
    private _authService: Regr
  ) {
  }

  public loadTodoList(): void {
    const params: TodoHttpParams = {
      id: this._authService.cachedUserData.id
    };

    this._api.get(this._localEnvironment + '/TodoList', params)
      .toPromise()
      .then((response: ApiResponse<TodoItem[]>) => {
        if (response.success) {
          this._todoList$$.next(response.result);
        }
      });
  }

  public getTodoItem(id: number): Promise<ApiResponse<TodoItem>> {
    const params: TodoHttpParams = {
      id,
      memberId: this._authService.cachedUserData.id
    };

    return this._api.get(this._localEnvironment, params)
      .toPromise()
      .then((response: ApiResponse<TodoItem>) => response);
  }

  public addTodoItem(todoItem: TodoItem): Promise<ApiResponse<TodoItem>> {
    return this._api.post<TodoItem>(this._localEnvironment, {...todoItem, memberId: this._authService.cachedUserData.id})
      .toPromise()
      .then((response: ApiResponse<TodoItem>) => {
        if (response.success) {
          if (todoItem.id) {
            this._todoList$$.next([...this._todoList$$.value.filter((item: TodoItem) => item.id !== todoItem.id), response.result]);
          } else {
            this._todoList$$.next([...this._todoList$$.value, response.result]);
          }
        }
        return response;
      });
  }

  public deleteTodoItem(id: number): void {
    const params: TodoHttpParams = {
      id,
      memberId: this._authService.cachedUserData.id
    };

    this._api.delete(this._localEnvironment, params)
      .toPromise()
      .then((response: ApiResponse<any>) => {
        if (response.success) {
          this._todoList$$.next(this._todoList$$.value.filter((item: TodoItem) => item.id !== id));
        }
      });
  }

}
