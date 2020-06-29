import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {TodoItem} from '../../../../common/services/common/interfaces/todo-item';
import {TodoService} from '../../../../common/services/todo/todo.service';
import {TodoComponentClass} from '../../../../common/classes/todo-components.class';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends TodoComponentClass implements OnInit {
  @ViewChild(MatPaginator, {static: true})
  private _paginator: MatPaginator;
  @ViewChild(MatSort, {static: true})
  private _sort: MatSort;
  private _todoList$: Observable<TodoItem[]> = this._todoService.todoList$;

  public selectedItemId: number;
  public displayedColumns: string[] = ['id', 'task', 'publicationDate'];
  public filteredTodoList: MatTableDataSource<TodoItem> = new MatTableDataSource<TodoItem>([]);
  public searchControl: FormControl = new FormControl('');

  constructor(
    private _todoService: TodoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this._todoService.loadTodoList();
    this.filteredTodoList.paginator = this._paginator;
    this.filteredTodoList.sort = this._sort;
    this._observeSafe(combineLatest(
      this._todoList$,
      this.searchControl.valueChanges
    )).subscribe(([todoList, searchText]: [TodoItem[], string]) => {
      const tasks: TodoItem[] = todoList.reduce((prevValue: TodoItem[], curItem: TodoItem) => {
        return curItem.task.indexOf(searchText) !== -1 ? [...prevValue, curItem] : prevValue;
      }, []);
      this.filteredTodoList.data = tasks.length ? tasks : todoList;
    });
    console.log(this._todoList$);
    this.searchControl.patchValue('');
  }

  public onClickRow(rowData: TodoItem): void {
    this.selectedItemId = rowData.id;
  }

  public onClickDelete(): void {
    this._todoService.deleteTodoItem(this.selectedItemId);
  }

  public onClickEdit(): void {
    this._router.navigate(['../edit', this.selectedItemId], {relativeTo: this._route});
  }

}
