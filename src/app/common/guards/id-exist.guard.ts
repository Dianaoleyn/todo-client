import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {TodoItem} from '../services/common/interfaces/todo-item';
import {Observable} from 'rxjs';
import {TodoService} from '../services/todo/todo.service';
import {ApiResponse} from '../services/common/interfaces/api-response.interface';
import {Regr} from '../services/auth/regr.service';

@Injectable()
export class IdExistGuard implements Resolve<TodoItem> {
  constructor(
    private _todoService: TodoService,
    private _authService: Regr
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TodoItem> | Promise<TodoItem> | TodoItem {
    const todoId: number = +route.paramMap.get('id');

    return this._todoService
      .getTodoItem(todoId)
      .then((response: ApiResponse<TodoItem>) => {
        if (response.success) {
          return response.result;
        }
        return null;
      });
  }

}
