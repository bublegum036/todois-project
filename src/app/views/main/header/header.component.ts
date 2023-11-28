import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItemCommandEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  userName: string | null = null;
  userMenu: { label: string, icon: string, command?: any }[] = [];
  navMenu: {}[] = [];
  private subscriptionSidebarVisible: Subscription;


  constructor(private ls: LocalStorageService,
    private auth: AuthService,
    private router: Router) {
      this.subscriptionSidebarVisible = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.sidebarVisible = false;
        }
      });
  }

  ngOnInit(): void {
    this.ls.getUserName().subscribe(name => {
      this.userName = name[0];
    });

    this.userMenu = [
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: (event: MenuItemCommandEvent) => {
          this.auth.logout()
        }
      }
    ]

    this.navMenu = [
      {
        label: 'Все задачи',
        routerLink: ['/tasks']
      },
      {
        label: 'Категории задач',
        routerLink: ['/task-category']
      },
      {
        label: 'Выполнено',
        routerLink: ['/complete']
      },
    ]
  }

  ngOnDestroy() {
    this.subscriptionSidebarVisible.unsubscribe();
  }

  sidebarOpen() {
    this.sidebarVisible = !this.sidebarVisible
  }
}
