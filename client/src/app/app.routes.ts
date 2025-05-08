import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InsertComponent } from './insert/insert.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'insert', component: InsertComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: ErrorComponent },
];
