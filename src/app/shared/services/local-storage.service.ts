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
  
  saveTasks(tasks: TaskAddType[] | '{}') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }

  getCategories(): Observable<CategoryAddType[] | '{}'> {
    const categories = JSON.parse(localStorage.getItem('categories') || '{}')
    return of(this.categories = categories)
  }
  
  saveCategories(categories: CategoryAddType[] | '{}') {
    localStorage.setItem('categories',JSON.stringify('categories'));
    this.categories$.next(categories);
  }
}
