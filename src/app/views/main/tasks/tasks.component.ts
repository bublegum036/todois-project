import {Component, OnInit} from '@angular/core';
import {MessageService, SortEvent} from "primeng/api";
import {TaskAddType} from "../../../../types/task-add.type";
import {Observable, of} from "rxjs";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService]
})
export class TasksComponent implements OnInit {
  tasks: TaskAddType[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.getTasks().subscribe(data => {
      if (!data) {
        this.messageService.add({severity: 'error', summary: 'Ошибка данных', detail: 'Ошибка запроса данных'})
      }

      this.tasks = data as TaskAddType[];
    })

  }

  getTasks(): Observable<TaskAddType[] | '{}'> {
    const data = JSON.parse(localStorage.getItem('tasks') || '{}')
    return of(data)
  }

}

// this.tasks = [{
//   taskName: 'Сделать таблицу',
//   taskDescription: 'Создать таблицу в tasks.component',
//   taskDateSet: '8.11.2023',
//   taskDeadline: '8.11.2023',
//   taskPriority: 'Высокий',
//   taskCategory: 'Учеба',
// },
//   {
//     taskName: 'Сделать таблицу',
//     taskDescription: 'Создать таблицу в tasks.component',
//     taskDateSet: '8.11.2023',
//     taskDeadline: '8.11.2023',
//     taskPriority: 'Высокий',
//     taskCategory: 'Учеба',
//   },
// ]
//request tasks from localStorage
// this.productService.getProductsMini().then((data) => {
//   this.products = data;
// });
