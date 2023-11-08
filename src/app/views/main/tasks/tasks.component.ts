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

  // customSort(event: SortEvent) {
  //   event.data.sort((data1, data2) => {
  //     let value1 = data1[event.field];
  //     let value2 = data2[event.field];
  //     let result = null;
  //
  //     if (value1 == null && value2 != null) result = -1;
  //     else if (value1 != null && value2 == null) result = 1;
  //     else if (value1 == null && value2 == null) result = 0;
  //     else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
  //     else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
  //
  //     return event.order * result;
  //   });
  // }
}
