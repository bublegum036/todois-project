import { Subject, filter, takeUntil, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskAddType } from '../../../../types/task-add.type';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit, OnDestroy {
  taskForAction: TaskAddType | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    this.tasksService.taskInfo$.pipe(
      filter((data: TaskAddType | null): data is TaskAddType => !!data),
      tap((data: TaskAddType) => {
        this.taskForAction = data
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
