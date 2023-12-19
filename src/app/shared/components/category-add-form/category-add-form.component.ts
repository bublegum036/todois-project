import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryAddType } from '../../../../types/category-add.type';
import { IdService } from '../../services/id.service';
import { CategoryAddFormInterface } from '../../interfaces/category-add-form.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'category-add-form',
  templateUrl: './category-add-form.component.html',
  styleUrls: ['./category-add-form.component.scss']
})
export class CategoryAddFormComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  categories: CategoryAddType[] = [];
  categoryId: number = 0;
  categoryForEdit: CategoryAddType | null = null;
  isCreate: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private unsubscribe$ = new Subject<void>();
  
  categoryAddForm: FormGroup = new FormGroup<CategoryAddFormInterface>({
    categoryName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]),
  })
  
  constructor(private categoryService: CategoryService,
    private messageService: MessageService,
    private idService: IdService,
    private auth: AuthService) {

    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      tap(user => this.activeUser = user),
      switchMap(user => this.categoryService.getCategories(user!)),
      map((data: CategoryAddType[]) => {
        this.categories = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()


    this.categoryService.getEditCategory().pipe(
      map((data: CategoryAddType | null) => {
        if (typeof data === 'object') {
          this.isCreate = false;
        } else {
          this.isCreate = true;
        }
        return data;
      }),
      tap((data: CategoryAddType | null) => {
        this.categoryForEdit = data;
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


    this.categoryService.categoryForEdit$.pipe(
      map((data: CategoryAddType | null) => {
        if (data && typeof data === 'object') {
          this.categoryForEdit = data;
          this.isCreate = false;
          this.categoryAddForm.setValue({
            categoryName: data.label,
          })
        } else {
          this.categoryForEdit = null
          this.isCreate = true;
          this.categoryAddForm.reset()
        }
        return data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()


    this.idService.categoryId$.pipe(
      map((id:number) => {
        this.categoryId = id
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createCategory() {
    if (this.categoryAddForm.valid) {
      const formValue = this.categoryAddForm.getRawValue();
      let category: CategoryAddType = {
        categoryName: formValue.categoryName,
        label: formValue.categoryName,
        categoryId: this.categoryId
      }

      if (this.categories && this.activeUser) {
        this.categories.push(category)
        this.categoryService.setCategories(this.categories, this.activeUser)
        this.saveCategoryNewId();
        this.closeAndCleanForm();
      }
    }
  }

  editCategory() {
    if (this.categoryForEdit) {
      if (this.categoryAddForm.valid) {
      const formValue = this.categoryAddForm.getRawValue();
        let category: CategoryAddType = {
          categoryName:formValue.categoryName,
          label: formValue.categoryName,
          categoryId: this.categoryForEdit.categoryId
        }
        let indexCategoryInArray: number = this.categories.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
        if (indexCategoryInArray !== -1 && this.activeUser) {
          this.categories.splice(indexCategoryInArray, 1, category);
          this.categoryService.setCategories(this.categories, this.activeUser)
          this.closeAndCleanForm()
        }
      }
    }
  }

  closeAndCleanForm() {
    if (!this.isCreate) {
      this.messageService.add({ severity: 'success', summary: 'Успешно!', detail: 'Категория отредактирована' })
    } else {
      this.messageService.add({ severity: 'success', summary: 'Успешно!', detail: 'Категория создана' })
    }
    setTimeout(() => {
      this.visibleChange.emit(false);
      this.categoryAddForm.reset();
    }, 500);
  }

  saveCategoryNewId() {
    this.idService.saveCategoryId()
  }
}
