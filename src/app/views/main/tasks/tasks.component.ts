import {Component} from '@angular/core';
import {SortEvent} from "primeng/api";
import {TaskType} from "../../../../types/task.type";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks!: TaskType[];

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
