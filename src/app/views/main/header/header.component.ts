import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItemCommandEvent, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NAV_MENU } from '../../../shared/constants/constants';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  userName: string | null = null;
  activeUser: string;
  userMenu: { label: string, icon: string, command?: any }[] = [];
  navMenu: { label: string, routerLink: [string] }[] = NAV_MENU;
  private subscriptionSidebarVisible: Subscription;
  private subscriptionUserName: Subscription;
  private subscriptionActiveUser: Subscription;


  constructor(private auth: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.subscriptionSidebarVisible = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.sidebarVisible = false;
      }
    });

    this.subscriptionUserName = this.auth.getUserName().subscribe(name => {
      if (name) {
        this.userName = name[0];
      } else {
        this.userName = null
      }
    });

    this.activeUser = ''
    this.subscriptionActiveUser = this.auth.getActiveUser().subscribe(user => {
      if (user && user.length > 0) {
        this.activeUser = user
      }
    })
  }

  ngOnInit(): void {
    this.userMenu = [
      {
        label: 'Удалить профиль',
        icon: 'pi pi-trash',
        command: (event: MenuItemCommandEvent) => {
          this.removeProfile();
        }
      },
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: (event: MenuItemCommandEvent) => {
          this.auth.logout();
        }
      },
    ]

  }

  ngOnDestroy() {
    this.subscriptionSidebarVisible.unsubscribe();
    this.subscriptionUserName.unsubscribe();
  }

  sidebarOpen() {
    this.sidebarVisible = !this.sidebarVisible
  }

  removeProfile() {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить профиль?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.auth.activeUser)
          this.auth.removeUserProfile(this.activeUser)
        this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Профиль удален' });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500)
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Отклонено',
              detail: 'Вы отменили удаление профиля'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Отменено' });
            break;
        }
      }
    });
  }
}
