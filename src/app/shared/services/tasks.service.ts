import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { TaskAddType } from '../../../types/task-add.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: TaskAddType[] | null = null;
  public tasks$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
  private tasksComplete: TaskAddType[] | null = null;
  public tasksComplete$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
  private taskInfo: TaskAddType | null = null;
  public taskInfo$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
  private taskForEdit: TaskAddType | null = null;
  public taskForEdit$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();


  constructor() {}

  getTasks(): Observable<TaskAddType[] | null> {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.setTasks(null);
      this.tasks = null;
    }
    return of(this.tasks);
  }

  setTasks(tasks: TaskAddType[] | null) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }

  getInfoTask(): Observable<TaskAddType | null> {
    const task = localStorage.getItem('infoTask');
    if (task) {
      this.taskInfo = JSON.parse(task);
    } else {
      this.setInfoTask(null);
      this.taskInfo = null;
    }
    return of(this.taskInfo);
  }

  setInfoTask(infoTask: TaskAddType | null) {
    localStorage.setItem('infoTask', JSON.stringify(infoTask));
    this.taskInfo$.next(infoTask);
  }

  getCompleteTasks(): Observable<TaskAddType[] | null> {
    const tasksComplete = localStorage.getItem('tasksComplete');
    if (tasksComplete) {
      this.tasksComplete = JSON.parse(tasksComplete);
    } else {
      this.setCompleteTasks(null);
      this.tasksComplete = null;
    }
    return of(this.tasksComplete);
  }

  setCompleteTasks(tasksComplete: TaskAddType[] | null) {
    localStorage.setItem('tasksComplete', JSON.stringify(tasksComplete));
    this.tasksComplete$.next(tasksComplete);
  }

  getEditTask(): Observable<TaskAddType | null> {
    const taskForEdit = localStorage.getItem('taskForEdit');
    if (taskForEdit) {
      this.taskForEdit = JSON.parse(taskForEdit);
    } else {
      this.setEditTask(null);
      this.taskForEdit = null;
    }
    return of(this.taskForEdit);
  }

  setEditTask(taskForEdit: TaskAddType | null) {
    localStorage.setItem('taskForEdit', JSON.stringify(taskForEdit));
    this.taskForEdit$.next(taskForEdit);
  }
}
