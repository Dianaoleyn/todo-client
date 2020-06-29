import { Component, OnInit } from '@angular/core';
import {Regr} from '../../services/auth/regr.service';
import {TodoComponentClass} from '../../classes/todo-components.class';
import {Auth} from '../../services/common/interfaces/auth.interface';
import {ApiService} from '../../services/common/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent extends TodoComponentClass implements OnInit {
  public login: string;
  public progressBarState$: Observable<boolean> = this._apiService.progressBarState$;

  constructor(
    private _apiService: ApiService,
    private _authService: Regr
  ) {
    super();
  }

  public ngOnInit(): void {
    this._observeSafe(this._authService.userData$).subscribe((userData: Auth) => this.login = userData?.login);
  }

}
