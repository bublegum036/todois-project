import { Subject, Subscription, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { TASKS_COMPLETE_COLUMNS } from 'src/app/shared/constants/constants';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { TaskAddType } from 'src/types/task-add.type';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CompleteComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  tasksComplete: TaskAddType[] = [];
  column: { field: string; header: string }[] = TASKS_COMPLETE_COLUMNS;
  globalFilter: string | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService
  ) {



    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      tap(user => this.activeUser = user),
      switchMap(user => tasksService.getCompleteTasks(user!)),
      map((data: TaskAddType[]) => {
        this.tasksComplete = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  ngOnInit() {
    this.tasksService.tasksComplete$.pipe(
      tap((data: TaskAddType[]) => {
        this.tasksComplete = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeCompleteTasks() {
    this.confirmationService.confirm({
      message: 'Вы хотите удалить выполненные задачи?',
      header: 'Выполнение',
      icon: 'pi pi-info-circle',
      accept: () => {
        if(this.activeUser)
        this.tasksService.setCompleteTasks([], this.activeUser);
        this.messageService.add({
          severity: 'info',
          summary: 'Успешно',
          detail: 'Выполненные задачи очищены',
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Отклонено',
              detail: 'Вы передумали',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Отмена',
              detail: 'Отменено',
            });
            break;
        }
      },
    });
  }
}
