import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { TaskAddType } from '../../../../types/task-add.type';
import { TasksService } from '../../../shared/services/tasks.service';
import { CategoryAddType } from '../../../../types/category-add.type';
import { TASKS_COLUMNS } from '../../../shared/constants/constants';
import { CategoryService } from '../../../shared/services/category.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class TasksComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  tasks: TaskAddType[] = [];
  taskCategory: CategoryAddType[] = [];
  tasksComplete: TaskAddType[] = [];
  addTaskVisible: boolean = false;
  addCategoryVisible: boolean = false;
  editTaskVisible: boolean = false;
  infoTaskVisible: boolean = false;
  column: { field: string; header: string }[] = TASKS_COLUMNS;
  private unsubscribe$ = new Subject<void>();
  globalFilter: string | null = null;

  constructor(
    private messageService: MessageService,
    private tasksService: TasksService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService,
    private auth: AuthService
  ) {
    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      map(user => this.activeUser = user),
      switchMap(user => this.tasksService.getTasks(user!)),
      map((data: TaskAddType[]) => {
        this.tasks = data;
      }),
      switchMap(user => this.categoryService.getCategories(user!)),
      map((data: CategoryAddType[]) => {
        this.taskCategory = data;
      }),
      switchMap(user => this.tasksService.getCompleteTasks(user!)),
      map((data: TaskAddType[]) => {
        this.tasksComplete = data;
      }),
    ).subscribe()
  }

  ngOnInit() {
    this.tasksService.tasks$.pipe(
      tap((data: TaskAddType[]) => {
        this.tasks = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.categoryService.categories$.pipe(
      tap((data: CategoryAddType[]) => {
        this.taskCategory = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();


    this.tasksService.tasksComplete$.pipe(
      tap((data: TaskAddType[]) => {
        this.tasksComplete = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openAddTaskMenu() {
    this.addTaskVisible = !this.addTaskVisible;
    this.tasksService.setEditTask(null);
  }

  closeEditTaskMenu(value: boolean) {
    this.editTaskVisible = value;
  }

  closeAddTaskMenu(value: boolean) {
    this.addTaskVisible = value;
  }

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.categoryService.setEditCategory(null);
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }

  closeInfoTaskMenu(value: boolean) {
    this.infoTaskVisible = value;
  }

  infoTask(task: TaskAddType) {
    this.infoTaskVisible = !this.infoTaskVisible;
    this.tasksService.setInfoTask(task);
  }

  editTask(task: TaskAddType) {
    this.tasksService.setEditTask(task);
    this.editTaskVisible = !this.editTaskVisible;
  }

  removeTask(task: TaskAddType) {
    if (this.tasks) {
      let indexTaskInArray: number = this.tasks.findIndex((taskFromLS) => taskFromLS.taskId === task.taskId);
      this.confirmationService.confirm({
        message: 'Вы действительно хотите удалить данную задачу?',
        header: 'Удаление',
        icon: 'pi pi-info-circle',
        accept: () => {
          if (indexTaskInArray !== -1 && this.activeUser) {
            this.tasks.splice(indexTaskInArray, 1);
            let tasksArrayForLS = this.tasks;
            this.tasksService.setTasks(tasksArrayForLS, this.activeUser);
          }
          this.messageService.add({
            severity: 'info',
            summary: 'Успешно',
            detail: 'Задача удалена',
          });
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({
                severity: 'error',
                summary: 'Отклонено',
                detail: 'Вы отменили удаление задачи',
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

  completeTask(task: TaskAddType) {
    let indexTaskInArray: number = this.tasks.findIndex(
      (taskFromLS) => taskFromLS.taskId === task.taskId
    );
    this.confirmationService.confirm({
      message: 'Вы выполнили данную задачу?',
      header: 'Выполнение',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexTaskInArray !== -1 && this.activeUser) {
          this.tasks.splice(indexTaskInArray, 1);
          let tasksArrayForLS = this.tasks;
          this.tasksService.setTasks(tasksArrayForLS, this.activeUser);
          if (!this.tasksComplete) {
            this.tasksService.setCompleteTasks([task], this.activeUser);
          } else {
            let tasksFromLS: TaskAddType[] = this.tasksComplete;
            let tasksArrayForLS = tasksFromLS.concat([task]);
            this.tasksService.setCompleteTasks(tasksArrayForLS, this.activeUser);
          }
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Успешно',
          detail: 'Задача перемещена в выполненные',
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

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return (event.order as number) * result;
    });
  }
}
