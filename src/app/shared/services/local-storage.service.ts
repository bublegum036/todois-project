import { Injectable } from '@angular/core';
import {Observable, Subject, of} from "rxjs";
import {TaskAddType} from "../../../types/task-add.type";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private tasks: TaskAddType[] | '{}' = []
  public tasks$: Subject<TaskAddType[] | '{}'> = new Subject<TaskAddType[] | '{}'>
  public categories$: Subject<string[] | '{}'> = new Subject<string[] | '{}'>

  tasksFromLS: TaskAddType[] | '{}' = []

  constructor() { 
    this.tasks = JSON.parse(localStorage.getItem('tasks')|| '{}')
  }


  getTasks(): Observable<TaskAddType[] | '{}'> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')
    return of(this.tasks = tasks)
  }

  saveTasks(tasks: TaskAddType[] | '{}'): void {
    localStorage.getItem('tasks');
    this.tasks$.next(tasks);
  }
  saveCategories(categories: string[] | '{}'): void {
    localStorage.getItem('categories');
    this.categories$.next(categories);
  }
}
