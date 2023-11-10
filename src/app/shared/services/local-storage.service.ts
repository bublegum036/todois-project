import { Injectable } from '@angular/core';
import {Observable, Subject, of} from "rxjs";
import {TaskAddType} from "../../../types/task-add.type";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private tasksFromLS: TaskAddType[] | '{}' = []
  public tasks$: Subject<TaskAddType[] | '{}'> = new Subject<TaskAddType[] | '{}'>()

  constructor() { 
    this.tasksFromLS = JSON.parse(localStorage.getItem('tasks')|| '{}')
  }


  getTasks(): Observable<TaskAddType[] | '{}'> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')
    return of(this.tasksFromLS = tasks)
    this.tasks$.next(this.tasksFromLS)
  }
}
