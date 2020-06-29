import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { TodoListComponent } from './modules/main/modules/todo-list/todo-list.component';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { HeaderMenuComponent } from './common/components/header-menu/header-menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './modules/auth/auth.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {ApiService} from './common/services/common/api.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MainComponent } from './modules/main/main.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SidebarComponent } from './modules/main/common/components/sidebar/sidebar.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddTodoComponent } from './modules/main/modules/add-todo/add-todo.component';
import {IdExistGuard} from './common/guards/id-exist.guard';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AuthComponent,
    HeaderMenuComponent,
    MainComponent,
    SidebarComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule
  ],
  providers: [
    ApiService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    IdExistGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
