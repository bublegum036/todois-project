import {Component, Input, OnInit} from '@angular/core';
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
        command: (event: MenuItemCommandEvent) => {
          this.openAddTaskMenu()
        }
      },
      {
        label: 'Все задачи',
        icon: 'pi pi-prime',
        routerLink: ['/tasks']
      },
      {
        label: 'Категории задач',
        icon: 'pi pi-list',
        routerLink: ['/task-category']
      },
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
      },
    ];
  }

  openAddTaskMenu() {
    this.addTaskVisible = !this.addTaskVisible;
  }

  closeTaskMenu(value: boolean) {
      this.addTaskVisible = value;
  }
}
