import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";

@Component({
  selector: 'menu-dashboard',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  userName!: string;
  addTaskVisible: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('user') || '{}').userInfo.name
    this.items = [
      {
        label: 'Создать задачу',
        icon: 'pi pi-plus-circle',
        command: (event: MenuItemCommandEvent) =>  {
          this.addTaskVisible = true;
        }
      },
      {
        label: 'Все задачи',
        icon: 'pi pi-prime',
      },
      {
        label: 'Категории задач',
        icon: 'pi pi-list',
        routerLink: ['/task-category']
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
}
