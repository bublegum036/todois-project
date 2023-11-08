import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";


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

  taskForm= this.fb.group({
    taskName: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDescription: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDateSet: ['', [Validators.required]],
    taskDeadline: ['', [Validators.required]],
    taskPriority: ['', [Validators.required]],
    taskCategory: ['', [Validators.required]],
  })



  ngOnInit() {
    this.priority = [
      {
        label: 'Высокий',
        icon: 'pi pi-angle-double-up'
      },
      {
        label: 'Обычный',
        icon: 'pi pi-angle-up'

      },
      {
        label: 'Низкий',
        icon: 'pi pi-arrow-right'
      },
      {
        label: 'Очень низкий',
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
    console.log(this.taskForm.value.taskName)
    console.log(this.taskForm.value.taskDescription)
    console.log(this.taskForm.value.taskDateSet)
    console.log(this.taskForm.value.taskDeadline)
    console.log(this.taskForm.value.taskPriority)
    console.log(this.taskForm.value.taskCategory)
  }
}
