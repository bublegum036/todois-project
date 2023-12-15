import { TasksService } from './../../../shared/services/tasks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from "primeng/api";
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  addTaskVisible: boolean = false;
  addCategoryVisible: boolean = false;
  private subscriptionOpenAddTaskMenu: Subscription;
  private subscriptionAddCategoryMenu: Subscription;


  constructor(private tasksService: TasksService,
    private auth: AuthService,
    private router: Router,
    private categoryService: CategoryService) {
      this.subscriptionOpenAddTaskMenu = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.addTaskVisible = false;
        }
      });

      this.subscriptionAddCategoryMenu = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.addCategoryVisible = false;
        }
      })
    }

  ngOnInit() {
    this.items = [
      {
        label: 'Создать задачу',
        icon: 'pi pi-plus-circle',
        command: (event: MenuItemCommandEvent) => {
          this.openAddTaskMenu();
        }
      },
      {
        label: 'Создать категорию',
        icon: 'pi pi-reply',
        command: (event: MenuItemCommandEvent) => {
          this.openAddCategoryMenu()
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
        label: 'Выполненные задачи',
        icon: 'pi pi-verified',
        routerLink: ['/complete']
      },
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: (event: MenuItemCommandEvent) => {
          this.auth.logout()
        }
      },
    ];
  }

  ngOnDestroy() {
    this.subscriptionOpenAddTaskMenu.unsubscribe();
    this.subscriptionAddCategoryMenu.unsubscribe();
  }

  openAddTaskMenu() {
    this.addTaskVisible = !this.addTaskVisible;
    this.addCategoryVisible = false;
    this.tasksService.setEditTask(null)
  }

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.addTaskVisible = false;
    this.categoryService.setEditCategory(null)
  }

  closeTaskMenu(value: boolean) {
    this.addTaskVisible = value;
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }
}
