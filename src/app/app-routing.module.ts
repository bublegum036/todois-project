import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/components/layout/layout.component";

const routes: Routes = [
  {path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
