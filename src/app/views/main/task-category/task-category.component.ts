import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CategoryAddType } from 'src/types/category-add.type';

@Component({
  selector: 'app-task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss']
})
export class TaskCategoryComponent implements OnInit{
  categoties: any | undefined;

  constructor(private ls: LocalStorageService) {
    
   }

ngOnInit() {
  this.ls.getCategories().subscribe(data => {
    this.categoties = data
  })


  this.ls.categories$.subscribe((data: CategoryAddType[] | '{}') => {
    this.categoties = data as CategoryAddType[]
  })
}

}
