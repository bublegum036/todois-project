import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { TASKS_COMPLETE_COLUMNS } from 'src/app/shared/constants/constants';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { TaskAddType } from 'src/types/task-add.type';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CompleteComponent implements OnInit, OnDestroy {
  tasksComplete: TaskAddType[] | null = null;
  column: { field: string; header: string }[] = TASKS_COMPLETE_COLUMNS;
  subscriptionTasksComplete: Subscription;

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.subscriptionTasksComplete = this.tasksService.getCompleteTasks().subscribe((data: TaskAddType[] | null) => {
      this.tasksComplete = data;
    });
  }

  ngOnInit() {
    this.tasksService.tasksComplete$.subscribe((data: TaskAddType[] | null) => {
      this.tasksComplete = data;
    });
  }

  ngOnDestroy() {
    this.subscriptionTasksComplete.unsubscribe()
  }

  removeCompleteTasks() {
    this.confirmationService.confirm({
      message: 'Вы хотите удалить выполненные задачи?',
      header: 'Выполнение',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.tasksService.setCompleteTasks([]);
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
