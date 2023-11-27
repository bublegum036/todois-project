import { Component, OnInit } from '@angular/core';
import { MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;
  userName: string | null = null;
  userMenu: { label: string, icon: string, command?: any }[];
  navMenu: {}[] = []


  constructor(private ls: LocalStorageService,
    private auth: AuthService) {
    this.userMenu = [
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: (event: MenuItemCommandEvent) => {
          this.auth.logout()
        }
      }
    ]
  }

  ngOnInit(): void {
    this.ls.getUserName().subscribe(name => {
      this.userName = name[0];
    });

    this.navMenu = [
      {
        label: 'Все задачи',
        // icon: 'pi pi-prime',
        routerLink: ['/tasks']
      },
      {
        label: 'Категории задач',
        // icon: 'pi pi-list',
        routerLink: ['/task-category']
      },
      {
        label: 'Выполнено',
        // icon: 'pi pi-list',
        routerLink: ['/task-category']
      },
    ]

  }

  sidebarOpen() {
    this.sidebarVisible = !this.sidebarVisible
  }


}
