import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItemCommandEvent, MessageService } from 'primeng/api';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { NAV_MENU } from '../../../shared/constants/constants';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  sidebarVisible: boolean = false;
  userName: string | null = null;
  userMenu: { label: string, icon: string, command?: any }[] = [];
  navMenu: { label: string, routerLink: [string] }[] = NAV_MENU;
  private unsubscribe$ = new Subject<void>();


  constructor(private auth: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap(event => this.sidebarVisible = false),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.auth.getUserName().pipe(
      tap(userName => {
        if (userName) {
          this.userName = userName[0]
        } else {
          this.userName = null
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()



    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      tap(user => this.activeUser = user),
      takeUntil(this.unsubscribe$)
    ).subscribe()
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
        if (this.activeUser)
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
