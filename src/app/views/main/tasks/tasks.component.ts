import {Component} from '@angular/core';
import {SortEvent} from "primeng/api";
import {TaskAddType} from "../../../../types/task-add.type";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks!: TaskAddType[];

  constructor() {
  }

  ngOnInit() {
    this.tasks = [{
      taskName: 'Сделать таблицу',
      taskDescription: 'Создать таблицу в tasks.component',
      taskDateSet: '8.11.2023',
      taskDeadline: '8.11.2023',
      taskPriority: 'Высокий',
      taskCategory: 'Учеба',
    },
      {
        taskName: 'Сделать таблицу',
        taskDescription: 'Создать таблицу в tasks.component',
        taskDateSet: '8.11.2023',
        taskDeadline: '8.11.2023',
        taskPriority: 'Высокий',
        taskCategory: 'Учеба',
      },
    ]
    //request tasks from localStorage
    // this.productService.getProductsMini().then((data) => {
    //   this.products = data;
    // });
  }
}
