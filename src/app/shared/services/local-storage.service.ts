import { Injectable } from '@angular/core';
import {Observable, Subject, of} from "rxjs";
import {TaskAddType} from "../../../types/task-add.type";
import { CategoryAddType } from 'src/types/category-add.type';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private tasks: TaskAddType[] | '{}' = []
  private categories: CategoryAddType[] | '{}' = []
  public tasks$: Subject<TaskAddType[] | '{}'> = new Subject<TaskAddType[] | '{}'>
  public categories$: Subject<CategoryAddType[] | '{}'> = new Subject<CategoryAddType[] | '{}'>

  tasksFromLS: TaskAddType[] | '{}' = []

  constructor() { 
    this.tasks = JSON.parse(localStorage.getItem('tasks')|| '{}')
  }


  getTasks(): Observable<TaskAddType[] | '{}'> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')
    return of(this.tasks = tasks)
  }

  getCategories(): Observable<CategoryAddType[] | '{}'> {
    const categories = JSON.parse(localStorage.getItem('categories') || '{}')
    return of(this.categories = categories)
  }

  saveTasks(tasks: TaskAddType[] | '{}'): void {
    localStorage.getItem('tasks');
    this.tasks$.next(tasks);
  }
  
  saveCategories(categories: CategoryAddType[] | '{}'): void {
    localStorage.getItem('categories');
    this.categories$.next(categories);
  }
}
