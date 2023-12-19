import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TaskAddType } from '../../../../types/task-add.type';
import { TasksService } from '../../services/tasks.service';
import { IdService } from '../../services/id.service';
import { CategoryAddType } from '../../../../types/category-add.type';
import { PRIORITY_TASKS } from '../../constants/constants';
import { PriorityType } from '../../../../types/priority.type';
import { TaskFormInterface } from '../../interfaces/task-form-interface';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  activeUser: string | null = null;
  tasks: TaskAddType[] = [];
  taskForEdit: TaskAddType | null = null;
  taskCategory: CategoryAddType[] = [];
  taskId: number = 0;
  priority: PriorityType[] = PRIORITY_TASKS;
  isCreate: boolean = true;
  private unsubscribe$ = new Subject<void>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm: FormGroup = new FormGroup<TaskFormInterface>({
    taskName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$'),
    ]),
    taskDescription: new FormControl(null, [
      Validators.required,
      Validators.maxLength(256),
      Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$'),
    ]),
    taskDateSet: new FormControl(null, Validators.required),
    taskDeadline: new FormControl(null, Validators.required),
    taskPriority: new FormControl(null, Validators.required),
    taskCategory: new FormControl(null),
  });

  constructor(
    private messageService: MessageService,
    private tasksService: TasksService,
    private idService: IdService,
    private categoryService: CategoryService,
    private auth: AuthService
  ) {
    this.auth.getActiveUser().pipe(
      filter(user => !!user),
      tap(user => this.activeUser = user),
      switchMap(user => this.categoryService.getCategories(user!)),
      map((data: CategoryAddType[]) => {
        this.taskCategory = data;
      }),
      switchMap(user => this.tasksService.getTasks(user!)),
      map((data: TaskAddType[]) => {
        this.tasks = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()


    this.tasksService.getEditTask().pipe(
      map((data: TaskAddType | null) => {
        if (typeof data === 'object') {
          this.isCreate = false;
        } else {
          this.isCreate = true;
        }
        return data;
      }),
      tap((data: TaskAddType | null) => {
        this.taskForEdit = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnInit() {
    this.tasksService.tasks$.pipe(
      tap((data: TaskAddType[]) => {
        this.tasks = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.tasksService.taskForEdit$.pipe(
      map((data: TaskAddType | null) => {
        if (data && typeof data === 'object') {
          this.isCreate = false;
          this.taskForm.patchValue({
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            taskDateSet: data.taskDateSet,
            taskDeadline: data.taskDeadline,
            taskPriority: this.priority.find(
              (item) => item.label === data.taskPriority
            ),
            taskCategory: this.taskCategory?.find(
              (item) => item.label === data.taskCategory
            ),
          });
        } else {
          this.isCreate = true;
          this.taskForm.reset();
        }
        this.taskForEdit = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.categoryService.categories$.pipe(
      tap((data: CategoryAddType[]) => {
        this.taskCategory = data;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.idService.taskId$.pipe(
      map((id: number) => {
        this.taskId = id
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.getRawValue()
      let task: TaskAddType = {
        taskName: formValue.taskName,
        taskDescription: formValue.taskDescription,
        taskDateSet: new Date(formValue.taskDateSet).toLocaleDateString(),
        taskDeadline: new Date(formValue.taskDeadline).toLocaleDateString(),
        taskPriority: Object(formValue.taskPriority).label,
        taskCategory: Object(formValue.taskCategory).label,
        taskId: this.taskId,
      };

      if (this.activeUser)
        if (this.tasks && this.tasks.length === 0) {
          this.tasksService.setTasks([task], this.activeUser);
          this.saveNewId();
          this.closeAndCleanForm();
        } else {
          this.tasks.push(task);
          this.tasksService.setTasks(this.tasks, this.activeUser);
          this.saveNewId();
          this.closeAndCleanForm();
        }
    }
  }

  editTask() {
    if (this.taskForEdit !== null) {
      const formValue = this.taskForm.getRawValue()
      if (this.taskForm.valid) {
        let taskDateSet = null;
        let taskDeadline = null;
        if (typeof formValue.taskDateSet === 'string') {
          taskDateSet = formValue.taskDateSet;
        } else {
          taskDateSet = new Date(formValue.taskDateSet).toLocaleDateString();
        }
        if (typeof formValue.taskDeadline === 'string') {
          taskDeadline = this.taskForm.value.taskDeadline;
        } else {
          taskDeadline = new Date(this.taskForm.value.taskDeadline).toLocaleDateString();
        }
        let task: TaskAddType = {
          taskName: formValue.taskName,
          taskDescription: formValue.taskDescription,
          taskDateSet: taskDateSet,
          taskDeadline: taskDeadline,
          taskPriority: Object(formValue.taskPriority).label,
          taskCategory: Object(formValue.taskCategory)?.label,
          taskId: this.taskForEdit.taskId,
        };

        let indexTaskInArray: number = this.tasks.findIndex(
          tasks => tasks.taskId === task.taskId
        );
        if (indexTaskInArray !== -1 && this.activeUser) {
          this.tasks.splice(indexTaskInArray, 1, task);
          this.tasksService.setTasks(this.tasks, this.activeUser);
          this.closeAndCleanForm();
        }
      }
    }
  }

  closeAndCleanForm() {
    if (!this.isCreate) {
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно!',
        detail: 'Задача отредактирована',
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно!',
        detail: 'Задача создана',
      });
    }
    setTimeout(() => {
      this.visibleChange.emit(false);
      this.taskForm.reset();
    }, 500);
  }

  saveNewId() {
    this.idService.saveTaskId();
  }
}
