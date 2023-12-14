import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { TaskAddType } from '../../../types/task-add.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksKey: string = 'tasks';
  public taskInfoKey: string = 'infoTask';
  public tasksCompleteKey: string = 'tasksComplete';
  public tasksForEditKey: string = 'taskForEdit';

  private tasks: TaskAddType[] | null = null;
  public tasks$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
  private tasksComplete: TaskAddType[] | null = null;
  public tasksComplete$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
  private taskInfo: TaskAddType | null = null;
  public taskInfo$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
  private taskForEdit: TaskAddType | null = null;
  public taskForEdit$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();


  constructor(private auth: AuthService) {}

  getTasks(): Observable<TaskAddType[] | null> {
    const tasks = localStorage.getItem(this.tasksKey);
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.setTasks(null);
      this.tasks = null;
    }
    return of(this.tasks);
  }

  setTasks(tasks: TaskAddType[] | null) {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }

  getInfoTask(): Observable<TaskAddType | null> {
    const task = localStorage.getItem(this.taskInfoKey);
    if (task) {
      this.taskInfo = JSON.parse(task);
    } else {
      this.setInfoTask(null);
      this.taskInfo = null;
    }
    return of(this.taskInfo);
  }

  setInfoTask(infoTask: TaskAddType | null) {
    localStorage.setItem(this.taskInfoKey, JSON.stringify(infoTask));
    this.taskInfo$.next(infoTask);
  }

  getCompleteTasks(): Observable<TaskAddType[] | null> {
    const tasksComplete = localStorage.getItem(this.tasksCompleteKey);
    if (tasksComplete) {
      this.tasksComplete = JSON.parse(tasksComplete);
    } else {
      this.setCompleteTasks(null);
      this.tasksComplete = null;
    }
    return of(this.tasksComplete);
  }

  setCompleteTasks(tasksComplete: TaskAddType[] | null) {
    localStorage.setItem(this.tasksCompleteKey, JSON.stringify(tasksComplete));
    this.tasksComplete$.next(tasksComplete);
  }

  getEditTask(): Observable<TaskAddType | null> {
    const taskForEdit = localStorage.getItem(this.tasksForEditKey);
    if (taskForEdit) {
      this.taskForEdit = JSON.parse(taskForEdit);
    } else {
      this.setEditTask(null);
      this.taskForEdit = null;
    }
    return of(this.taskForEdit);
  }

  setEditTask(taskForEdit: TaskAddType | null) {
    localStorage.setItem(this.tasksForEditKey, JSON.stringify(taskForEdit));
    this.taskForEdit$.next(taskForEdit);
  }
}
