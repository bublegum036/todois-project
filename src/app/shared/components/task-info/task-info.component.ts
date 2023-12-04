import { Component, Input, OnInit } from '@angular/core';
import { TaskAddType } from 'src/types/task-add.type';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {
  taskForAction: TaskAddType | '{}' | null = null;
  taskName: string | null = null;
  taskDescription: string| null = null;
  taskDateSet: string| null = null;
  taskDeadline: string| null = null;
  taskPriority: string| null = null;
  taskCategory?: string| null = null;

  constructor(private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.ls.getInfoTask().subscribe(task => {
      this.taskForAction = task;
    })

    this.ls.taskInfo$.subscribe(task => {
      this.taskForAction = task as TaskAddType;
      this.taskName = (this.taskForAction as TaskAddType).taskName;
      this.taskDescription = (this.taskForAction as TaskAddType).taskDescription;
      this.taskDateSet = (this.taskForAction as TaskAddType).taskDateSet;
      this.taskDeadline = (this.taskForAction as TaskAddType).taskDeadline;
      this.taskPriority = (this.taskForAction as TaskAddType).taskPriority;
      this.taskCategory = (this.taskForAction as TaskAddType).taskCategory;
    })
  }

}
