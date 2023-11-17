import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CategoryAddType } from 'src/types/category-add.type';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskCategoryComponent implements OnInit {
  categories: CategoryAddType[] = [];
  editCategoryVisible: boolean = false;

  constructor(private ls: LocalStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.ls.getCategories().subscribe((data: CategoryAddType[] | '{}') => {
      this.categories = data as CategoryAddType[];
    })

    this.ls.categories$.subscribe((data: CategoryAddType[] | '{}') => {
      this.categories = data as CategoryAddType[]
    })
  }

  editCategory(category: any) {
    this.ls.setEditCategory(category);
    this.editCategoryVisible = !this.editCategoryVisible;
  }

  closeCategoryMenu(value: boolean) {
    this.editCategoryVisible = value;
  }

  removeCategory(category: any) {
    console.log(category)
    let indexCategoryInArray: number = this.categories.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить данную категорию?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexCategoryInArray !== -1) {
          this.categories.splice(indexCategoryInArray, 1);
          let categoriesArrayForLS = JSON.stringify(this.categories)
          localStorage.removeItem('categories');
          localStorage.setItem('categories', categoriesArrayForLS);
        }
        this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Категория удалена' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Вы отменили удаление категории' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Отменено' });
            break;
        }
      }
    });
  }
}
