import { Subscription } from 'rxjs';
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
  activeUser: string;
  categories: CategoryAddType[] | null = null;
  categoryId: number = 0;
  categoryForEdit: CategoryAddType | null = null;
  isButton: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscriptionCategories: Subscription;
  subscriptionCategoryForEdit: Subscription;
  private subscriptionActiveUser: Subscription;


  constructor(private categoryService: CategoryService,
    private messageService: MessageService,
    private idService: IdService,
    private auth: AuthService) {

    this.activeUser = ''
    this.subscriptionActiveUser = this.auth.getActiveUser().subscribe(user => {
      if (user && user.length > 0) {
        this.activeUser = user
      }
    })
    this.subscriptionCategories = this.categoryService.getCategories(this.activeUser).subscribe((data: CategoryAddType[] | null) => {
      this.categories = data;
    })

    this.subscriptionCategoryForEdit = this.categoryService.getEditCategory().subscribe((data: CategoryAddType | null) => {
      if (typeof data === 'object') {
        this.isButton = false;
      } else {
        this.isButton = true;
      }
      this.categoryForEdit = data;
    })
  }

  categoryAddForm: FormGroup = new FormGroup<CategoryAddFormInterface>({
    categoryName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]),
  })

  ngOnInit() {
    this.categoryService.categories$.subscribe((data: CategoryAddType[] | []) => {
      this.categories = data;
    })

    this.categoryService.categoryForEdit$.subscribe((data: CategoryAddType | null) => {
      if (data) {
        this.isButton = false;
        this.categoryAddForm.setValue({
          categoryName: data.label,
        })
      } else {
        this.isButton = true;
        this.categoryAddForm.reset()
      }
      if (data !== null) {
        this.categoryForEdit = data;
      } else {
        this.categoryForEdit = null
      }
    })

    this.idService.categoryId$
      .subscribe(categoryId => {
        this.categoryId = categoryId
      })
  }

  ngOnDestroy() {
    this.subscriptionCategories.unsubscribe();
    this.subscriptionCategoryForEdit.unsubscribe();
    this.subscriptionActiveUser.unsubscribe();
  }

  createCategory() {
    if (this.categoryAddForm.valid
      && this.categoryAddForm.value.categoryName) {

      let category: CategoryAddType = {
        categoryName: this.categoryAddForm.value.categoryName,
        label: this.categoryAddForm.value.categoryName,
        categoryId: this.categoryId
      }

      if (this.categories) {
        let addCategory = this.categories.concat([category])
        this.categoryService.setCategories(addCategory, this.activeUser)
        this.saveCategoryNewId();
        this.closeAndCleanForm();
      }
    }
  }

  editCategory() {
    if (this.categoryForEdit !== null) {
      if (this.categoryAddForm.valid
        && this.categoryAddForm.value.categoryName) {
        let category: CategoryAddType = {
          categoryName: this.categoryAddForm.value.categoryName,
          label: this.categoryAddForm.value.categoryName,
          categoryId: this.categoryForEdit.categoryId
        }
        let categoryFromLS: CategoryAddType[] = this.categories!;
        let indexCategoryInArray: number = categoryFromLS.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
        if (indexCategoryInArray !== -1) {
          categoryFromLS.splice(indexCategoryInArray, 1, category);
          this.categoryService.setCategories(categoryFromLS, this.activeUser)
          this.closeAndCleanForm()
        }
      }
    }
  }

  closeAndCleanForm() {
    if (!this.isButton) {
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
