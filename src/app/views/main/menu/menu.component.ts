import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from "primeng/api";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'menu-dashboard',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  userName!: string;
  addTaskVisible: boolean = false;
  addCategoryVisible: boolean = false;
  private subscriptionOpenAddTaskMenu: Subscription;
  private subscriptionAddCategoryMenu: Subscription;

  constructor(private ls: LocalStorageService,
    private auth: AuthService,
    private router: Router) {
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
    this.ls.getUserName().subscribe(name => {
      this.userName = name;
    });
    
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
        icon: 'pi pi-plus-circle',
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
    this.ls.setEditTask('{}')
  }

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.addTaskVisible = false;
    this.ls.setEditCategory('{}')
  }

  closeTaskMenu(value: boolean) {
    this.addTaskVisible = value;
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }
}
