import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./views/layout/layout.component";
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
      // {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard]},
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
