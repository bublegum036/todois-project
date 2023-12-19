import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryAddType } from '../../../../types/category-add.type';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskCategoryComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  categories: CategoryAddType[] = [];
  addCategoryVisible: boolean = false;
  editCategoryVisible: boolean = false;
  private unsubscribe$ = new Subject<void>();
  

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService,
    private auth: AuthService
  ) {

    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      tap(user => this.activeUser = user),
      switchMap(user => this.categoryService.getCategories(user!)),
      map((data: CategoryAddType[]) => {
        this.categories = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  ngOnInit() {
    this.categoryService.categories$.pipe(
      tap((data: CategoryAddType[]) => {
        this.categories = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editCategory(category: CategoryAddType) {
    this.categoryService.setEditCategory(category);
    this.editCategoryVisible = !this.editCategoryVisible;
  }

  closeCategoryMenu(value: boolean) {
    this.editCategoryVisible = value;
  }

  removeCategory(category: CategoryAddType) {
    let indexCategoryInArray: number = this.categories.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить данную категорию?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexCategoryInArray !== -1 && this.activeUser) {
          this.categories.splice(indexCategoryInArray, 1);
          let categoriesArrayForLS = this.categories;
          this.categoryService.setCategories(categoriesArrayForLS, this.activeUser)
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
