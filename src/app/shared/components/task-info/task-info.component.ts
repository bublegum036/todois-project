import { Subscription } from 'rxjs';
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
  taskName: string | null = null;
  taskDescription: string | null = null;
  taskDateSet: string | null = null;
  taskDeadline: string | null = null;
  taskPriority: string | null = null;
  taskCategory?: string | null = null;
  subscriptionTaskInfo: Subscription | null = null;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    this.subscriptionTaskInfo = this.tasksService.taskInfo$.subscribe(task => {
      this.taskForAction = task
      if (this.taskForAction) {
        this.taskName = (this.taskForAction as TaskAddType).taskName;
        this.taskDescription = (this.taskForAction as TaskAddType).taskDescription;
        this.taskDateSet = (this.taskForAction as TaskAddType).taskDateSet;
        this.taskDeadline = (this.taskForAction as TaskAddType).taskDeadline;
        this.taskPriority = (this.taskForAction as TaskAddType).taskPriority;
        this.taskCategory = (this.taskForAction as TaskAddType).taskCategory;
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionTaskInfo?.unsubscribe()
  }
}
