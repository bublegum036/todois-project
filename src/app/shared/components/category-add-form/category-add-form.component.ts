import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from 'primeng/api';
import { CategoryAddType } from 'src/types/category-add.type';
import { IdService } from '../../services/id.service';
import { CategoryAddFormInterface } from '../../interfaces/category-add-form.interface';

@Component({
  selector: 'category-add-form',
  templateUrl: './category-add-form.component.html',
  styleUrls: ['./category-add-form.component.scss']
})
export class CategoryAddFormComponent implements OnInit {
  categoryId: number = 0;
  categoryForEdit: CategoryAddType | '{}' = '{}';
  isButton: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder,
    private ls: LocalStorageService,
    private messageService: MessageService,
    private idService: IdService) {
  }

  categoryAddForm: FormGroup = new FormGroup<CategoryAddFormInterface>({
    categoryName:new FormControl (null, [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]),
  })

  ngOnInit() {
    this.ls.getEditCategory().subscribe((data: CategoryAddType | '{}') => {
      if (typeof data === 'object') {
        this.isButton = false;
      } else {
        this.isButton = true;
      }
      this.categoryForEdit = data;
    })

    this.ls.categoryForEdit$.subscribe((data: CategoryAddType | '{}') => {
      if (typeof data === 'object') {
        this.isButton = false;
        this.categoryAddForm.setValue({
          categoryName: data.label,
        })
      } else {
        this.isButton = true;
        this.categoryAddForm.reset()
      }
      this.categoryForEdit = data;
    })


    this.idService.categoryId$
      .subscribe(categoryId => {
        this.categoryId = categoryId
      })
  }


  createCategory() {
    if (this.categoryAddForm.valid
      && this.categoryAddForm.value.categoryName) {

      let category: CategoryAddType = {
        categoryName: this.categoryAddForm.value.categoryName,
        label: this.categoryAddForm.value.categoryName,
        categoryId: this.categoryId
      }

      if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify([category]));
        this.saveCategoryNewId();
        this.closeAndCleanForm();
      } else {
        let categoryFromLS: CategoryAddType[] = JSON.parse(localStorage.getItem('categories') || '[]');
        if (categoryFromLS === null) {
          categoryFromLS = []
        }
        let tasksArrayForLS: string = JSON.stringify(categoryFromLS.concat([category]));
        localStorage.removeItem('categories');
        localStorage.setItem('categories', tasksArrayForLS);
        this.saveCategoryNewId();
        this.closeAndCleanForm();
      }
      this.ls.setCategories(JSON.parse(localStorage.getItem('categories') || '[]'));
    }
  }

  editCategory() {
    if (this.categoryForEdit !== '{}') {
      if (this.categoryAddForm.valid
        && this.categoryAddForm.value.categoryName) {
        let category: CategoryAddType = {
          categoryName: this.categoryAddForm.value.categoryName,
          label: this.categoryAddForm.value.categoryName,
          categoryId: this.categoryForEdit.categoryId
        }
        let categoryFromLS: CategoryAddType[] = JSON.parse(localStorage.getItem('categories') || '{}');
        let indexCategoryInArray: number = categoryFromLS.findIndex(categoryFromLS => categoryFromLS.categoryId === category.categoryId);
        if (indexCategoryInArray !== -1) {
          categoryFromLS.splice(indexCategoryInArray, 1, category);
          localStorage.removeItem('categories');
          localStorage.setItem('categories', JSON.stringify(categoryFromLS));
          this.closeAndCleanForm()
        }
        this.ls.setCategories(JSON.parse(localStorage.getItem('categories') || '{}'))
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
