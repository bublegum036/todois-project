import {Component, Input, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, PrimeIcons} from "primeng/api";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] = [];
  userName!: string;
  @Input() visibleAddTask: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('user') || '{}').userInfo.name
    this.items = [
      {
        label: 'Создать задачу',
        icon: 'pi pi-plus-circle',
        command: (event: MenuItemCommandEvent) =>  {
          this.showAddTasksModal()
        }
      },
      {
        label: 'Все задачи',
        icon: 'pi pi-prime',
      },
      {
        label: 'Категории задач',
        icon: 'pi pi-list',
      },
      {
        label: 'Выполнено',
        icon: 'pi pi-check',
      },
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
      },
    ];
  }

  showAddTasksModal() {
    this.visibleAddTask = true;
  }
}
