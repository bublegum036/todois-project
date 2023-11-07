import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  priority: any[] | undefined;
  taskCategory: any[] | undefined;


  constructor() {
  }

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
}
