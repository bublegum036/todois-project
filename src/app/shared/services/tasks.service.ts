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

  private tasks: TaskAddType[] | [] = [];
  public tasks$: Subject<TaskAddType[] | []> = new Subject<TaskAddType[] | []>();
  private tasksComplete: TaskAddType[] | [] = [];
  public tasksComplete$: Subject<TaskAddType[] | []> = new Subject<TaskAddType[] | []>();
  private taskInfo: TaskAddType | null = null;
  public taskInfo$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
  private taskForEdit: TaskAddType | null = null;
  public taskForEdit$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();


  constructor(private auth: AuthService) { }

  getTasks(activeUser: string): Observable<TaskAddType[] | []> {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS && userArrayFromLS.length > 0) {
      const userArray = JSON.parse(userArrayFromLS)
      const activeUserTasks = userArray.find((item: TaskAddType[] | []) => {
        return item.hasOwnProperty(this.tasksKey)
      })
      if (activeUserTasks && activeUserTasks.tasks) {
        this.tasks = activeUserTasks.tasks
      } else {
        const arrayWithTasks = JSON.stringify(userArray.concat([{ tasks: [] }]))
        this.auth.updateUser(activeUser, arrayWithTasks)
      }
    }
    return of(this.tasks);
  }

  setTasks(newTasks: TaskAddType[] | [], activeUser: string) {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS && userArrayFromLS.length > 0) {
      let userArray = JSON.parse(userArrayFromLS);
      let newTasksArray = { tasks: newTasks }
      let removeTasksFromLS = userArray.filter((item: { tasks: TaskAddType[] | [] }) => {
        return !item.hasOwnProperty(this.tasksKey);
      })
      let arrayForUpdate = JSON.stringify(removeTasksFromLS.concat(newTasksArray))
      console.log(JSON.parse(arrayForUpdate))
      this.auth.updateUser(activeUser, arrayForUpdate)
      this.tasks$.next(newTasks)
    }
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

  getCompleteTasks(activeUser: string): Observable<TaskAddType[] | []> {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS && userArrayFromLS.length > 0) {
      const userArray = JSON.parse(userArrayFromLS)
      const activeUserTasksComplete = userArray.find((item: TaskAddType | []) => {
        return item.hasOwnProperty(this.tasksCompleteKey)
      })
      if (activeUserTasksComplete && activeUserTasksComplete.tasksComplete) {
        this.tasksComplete = activeUserTasksComplete.tasksComplete
      } else {
        const arrayWithTasks = JSON.stringify(userArray.concat([{ tasksComplete: [] }]))
        this.auth.updateUser(activeUser, arrayWithTasks)
      }
    }
    return of(this.tasksComplete);
  }

  setCompleteTasks(tasksComplete: TaskAddType[] | [], activeUser: string) {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS !== null && userArrayFromLS.length > 0) {
      let userArray = JSON.parse(userArrayFromLS);
      let newTasksCompleteArray = { tasksComplete: tasksComplete }
      let removeTasksCompleteFromLS = userArray.filter((item: { tasksComplete: TaskAddType[] | [] }) => {
        return !item.hasOwnProperty(this.tasksCompleteKey);
      })
      let arrayForUpdate = JSON.stringify(removeTasksCompleteFromLS.concat(newTasksCompleteArray))
      this.auth.updateUser(activeUser, arrayForUpdate)
      this.tasksComplete$.next(tasksComplete)
    }
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
