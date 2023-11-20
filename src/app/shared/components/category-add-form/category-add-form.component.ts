import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from 'primeng/api';
import { CategoryAddType } from 'src/types/category-add.type';
import { IdService } from '../../services/id.service';

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

  categoryAddTask = this.fb.group({
    categoryName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
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
        this.categoryAddTask = this.fb.group({
          categoryName: [data.categoryName, [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
        })
      } else {
        this.isButton = true;
        this.categoryAddTask = this.fb.group({
          categoryName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
        })
      }
      this.categoryForEdit = data;
    })


    this.idService.categoryId$
      .subscribe(categoryId => {
        this.categoryId = categoryId
      })
  }


  createCategory() {
    if (this.categoryAddTask.valid
      && this.categoryAddTask.value.categoryName) {

      let category: CategoryAddType = {
        categoryName: this.categoryAddTask.value.categoryName,
        label: this.categoryAddTask.value.categoryName,
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

      // if (!localStorage.getItem('categories')) {
      //   localStorage.setItem('categories', JSON.stringify([category]));
      //   this.saveCategoryNewId();
      //   this.closeAndCleanForm();
      // } else {
      //   let categoryFromLS: CategoryAddType[] = JSON.parse(localStorage.getItem('categories') || '[]');
      //   let tasksArrayForLS: string = JSON.stringify(categoryFromLS.concat([category]));
      //   localStorage.removeItem('categories');
      //   localStorage.setItem('categories', tasksArrayForLS);
      //   this.saveCategoryNewId();
      //   this.closeAndCleanForm();
      // }
      // this.ls.setCategories(JSON.parse(localStorage.getItem('categories') || '[]'))
    }
  }

  editCategory() {
    if (this.categoryForEdit !== '{}') {
      if (this.categoryAddTask.valid
        && this.categoryAddTask.value.categoryName) {
        let category: CategoryAddType = {
          categoryName: this.categoryAddTask.value.categoryName,
          label: this.categoryAddTask.value.categoryName,
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
      this.categoryAddTask.reset();
    }, 500);
  }

  saveCategoryNewId() {
    this.idService.saveCategoryId()
  }
}
