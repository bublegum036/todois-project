import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskAddType} from "../../../../types/task-add.type";


@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  priority: any[] | undefined;
  taskCategory: any[] | undefined;


  constructor(private fb: FormBuilder) {
  }

  taskForm = this.fb.group({
    taskName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDescription: ['', [Validators.required, Validators.maxLength(256), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDateSet: ['', [Validators.required]],
    taskDeadline: ['', [Validators.required]],
    taskPriority: ['', [Validators.required]],
    taskCategory: ['', [Validators.required]],
  })


  ngOnInit() {
    this.priority = [
      {
        label: 'Высокий',
        data: 'Высокий',
        icon: 'pi pi-angle-double-up'
      },
      {
        label: 'Обычный',
        data: 'Обычный',
        icon: 'pi pi-angle-up'

      },
      {
        label: 'Низкий',
        data: 'Низкий',
        icon: 'pi pi-arrow-right'
      },
      {
        label: 'Очень низкий',
        data: 'Очень низкий',
        icon: 'pi pi-arrow-down-right'
      },
    ]


    this.taskCategory = [
      {
        label: 'Личные',
        icon: 'pi pi-user'
      },
      {
        label: 'Учеба',
        icon: 'pi pi-desktop'

      },
      {
        label: 'Работа',
        icon: 'pi pi-truck'
      },
      {
        label: 'Семья',
        icon: 'pi pi-users'
      },
    ]
  }


  createTask() {
    if (this.taskForm.valid && this.taskForm.value.taskName
      && this.taskForm.value.taskDescription
      && this.taskForm.value.taskDateSet
      && this.taskForm.value.taskDeadline
      && this.taskForm.value.taskPriority
      && this.taskForm.value.taskCategory) {

      const task: TaskAddType = {
        taskName: this.taskForm.value.taskName,
        taskDescription: this.taskForm.value.taskName,
        taskDateSet: this.taskForm.value.taskDateSet = new Date().toLocaleDateString(),
        taskDeadline: this.taskForm.value.taskDeadline = new Date().toLocaleDateString(),
        taskPriority: Object(this.taskForm.value.taskPriority).label,
        taskCategory: Object(this.taskForm.value.taskCategory).label
      }


    }
  }
}
