import { Component } from '@angular/core';

@Component({
  selector: 'app-task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss']
})
export class TaskCategoryComponent {
  categoties: any | undefined;

  constructor() {
    this.categoties = JSON.parse(localStorage.getItem('categories') || '')
   }



}
