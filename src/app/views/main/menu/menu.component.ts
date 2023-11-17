import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'menu-dashboard',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  userName!: string;
  addTaskVisible: boolean = false;
  addCategoryVisible: boolean = false;

  constructor(private ls: LocalStorageService) {

  }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('user') || '{}').userInfo.name
    this.items = [
      {
        label: 'Создать задачу',
        icon: 'pi pi-plus-circle',
        command: (event: MenuItemCommandEvent) => {
          this.openAddTaskMenu();
          this.ls.setEditTask('{}')
        }
      },
      {
        label: 'Создать категорию',
        icon: 'pi pi-plus-circle',
        command: (event: MenuItemCommandEvent) => {
          this.openAddCategoryMenu()
          this.ls.setEditCategory('{}')
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

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
  }

  closeTaskMenu(value: boolean) {
      this.addTaskVisible = value;
  }

  closeAddCategory(value: boolean) {
      this.addCategoryVisible = value;
  }
}
