import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    LayoutComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet
    ]
})
export class SharedModule { }
