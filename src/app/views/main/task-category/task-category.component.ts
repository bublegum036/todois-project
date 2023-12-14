import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryAddType } from '../../../../types/category-add.type';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskCategoryComponent implements OnInit, OnDestroy {
  activeUser: string;
  categories: CategoryAddType[] | [] = [];
  addCategoryVisible: boolean = false;
  editCategoryVisible: boolean = false;
  subscriptionCategories: Subscription;
  private subscriptionActiveUser: Subscription;


  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService,
    private auth: AuthService
  ) {

    this.activeUser = ''
    this.subscriptionActiveUser = this.auth.getActiveUser().subscribe(user => {
      if (user && user.length > 0) {
        this.activeUser = user
      }
    })

    this.subscriptionCategories = this.categoryService.getCategories(this.activeUser).subscribe((data: CategoryAddType[] | []) => {
      this.categories = data;
    })
  }

  ngOnInit() {
    this.categoryService.categories$.subscribe((data: CategoryAddType[] | []) => {
      this.categories = data
    })
  }

  ngOnDestroy() {
    this.subscriptionCategories.unsubscribe()
    this.subscriptionActiveUser.unsubscribe()
  }

  editCategory(category: CategoryAddType) {
    this.categoryService.setEditCategory(category);
    this.editCategoryVisible = !this.editCategoryVisible;
  }

  closeCategoryMenu(value: boolean) {
    this.editCategoryVisible = value;
  }

  removeCategory(category: any) {
    // let indexCategoryInArray: number = this.categories.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
    // this.confirmationService.confirm({
    //   message: 'Вы действительно хотите удалить данную категорию?',
    //   header: 'Удаление',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {
    //     if (indexCategoryInArray !== -1) {
    //       this.categories.splice(indexCategoryInArray, 1);
    //       let categoriesArrayForLS = this.categories;
    //       this.categoryService.setCategories(categoriesArrayForLS)
    //     }
    //     this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Категория удалена' });
    //   },
    //   reject: (type: ConfirmEventType) => {
    //     switch (type) {
    //       case ConfirmEventType.REJECT:
    //         this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Вы отменили удаление категории' });
    //         break;
    //       case ConfirmEventType.CANCEL:
    //         this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Отменено' });
    //         break;
    //     }
    //   }
    // });
  }

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.categoryService.setEditCategory(null)
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }
}
