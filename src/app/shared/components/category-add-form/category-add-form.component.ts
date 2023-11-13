import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from 'primeng/api';
import { CategoryAddType } from 'src/types/category-add.type';

@Component({
  selector: 'category-add-form',
  templateUrl: './category-add-form.component.html',
  styleUrls: ['./category-add-form.component.scss']
})
export class CategoryAddFormComponent {
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder,
    private ls: LocalStorageService,
    private messageService: MessageService) {
  }

  categoryAddTask = this.fb.group({
    categoryName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
  })



  createCategory() {
    if (this.categoryAddTask.valid
      && this.categoryAddTask.value.categoryName) {

      let category: CategoryAddType = {
        categoryName: this.categoryAddTask.value.categoryName
      }

      if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify([category]));
        this.closeAndCleanAddCategoryAddTaskForm();
      } else {
        let categoryFromLS: CategoryAddType[] = JSON.parse(localStorage.getItem('categories') || '{}');
        let tasksArrayForLS: string = JSON.stringify(categoryFromLS.concat([category]));
        localStorage.removeItem('categories');
        localStorage.setItem('categories', tasksArrayForLS);
        this.closeAndCleanAddCategoryAddTaskForm();
        console.log(JSON.parse(localStorage.getItem('categories') || ''));
      }
      this.ls.saveCategories(JSON.parse(localStorage.getItem('categories') || '{}'))
    }
  }

  closeAndCleanAddCategoryAddTaskForm(){
    this.messageService.add({severity: 'success', summary: 'Успешно!', detail: 'Категория успешно создана'})
    setTimeout(() => {
      this.visibleChange.emit(false);
      this.categoryAddTask.reset();
    }, 4000);
  }
}
