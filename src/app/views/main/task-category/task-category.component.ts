import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryAddType } from '../../../../types/category-add.type';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskCategoryComponent implements OnInit, OnDestroy {
  categories: CategoryAddType[] = [];
  addCategoryVisible: boolean = false;
  editCategoryVisible: boolean = false;
  subscriptionCategories: Subscription;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService
  ) {
    this.subscriptionCategories = this.categoryService.getCategories().subscribe((data: CategoryAddType[] | null) => {
      this.categories = data as CategoryAddType[];
    })
   }

  ngOnInit() {
    this.categoryService.categories$.subscribe((data: CategoryAddType[] | '{}' | null) => {
      this.categories = data as CategoryAddType[]
    })
  }

  ngOnDestroy() {
    this.subscriptionCategories.unsubscribe()
  }

  editCategory(category: CategoryAddType) {
    this.categoryService.setEditCategory(category);
    this.editCategoryVisible = !this.editCategoryVisible;
  }

  closeCategoryMenu(value: boolean) {
    this.editCategoryVisible = value;
  }

  removeCategory(category: any) {
    let indexCategoryInArray: number = this.categories.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить данную категорию?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexCategoryInArray !== -1) {
          this.categories.splice(indexCategoryInArray, 1);
          let categoriesArrayForLS = this.categories;
          this.categoryService.setCategories(categoriesArrayForLS)
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

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.categoryService.setEditCategory(null)
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }
}
