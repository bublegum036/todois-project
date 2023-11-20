import { Injectable } from '@angular/core';
import { Observable, Subject, of } from "rxjs";
import { TaskAddType } from "../../../types/task-add.type";
import { CategoryAddType } from '../../../types/category-add.type';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private tasks: TaskAddType[] | '{}' | null= []
  private categories: CategoryAddType[] | '{}' | null = []
  public tasks$: Subject<TaskAddType[] | '{}' | null> = new Subject<TaskAddType[] | '{}' | null>
  public categories$: Subject<CategoryAddType[] | '{}' | null > = new Subject<CategoryAddType[] | '{}' | null >
  private tasksForEdit: TaskAddType | '{}';
  public taskForEdit$: Subject<TaskAddType | '{}'> = new Subject<TaskAddType | '{}'>();
  private categoryForEdit: CategoryAddType | '{}';
  public categoryForEdit$: Subject<CategoryAddType | '{}'> = new Subject<CategoryAddType | '{}'>();

  tasksFromLS: TaskAddType[] | '{}' = []

  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    this.tasksForEdit = JSON.parse(localStorage.getItem('tasksForEdit') || '{}');
    this.categoryForEdit = JSON.parse(localStorage.getItem('categoryForEdit') || '{}');
  }

  

  getTasks(): Observable<TaskAddType[] | '{}'> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')
    return of(this.tasks = tasks)
  }

  setTasks(tasks: TaskAddType[] | '{}'| null) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }

  getCategories(): Observable<CategoryAddType[] | '{}'> {
    const categories = JSON.parse(localStorage.getItem('categories') || '{}')
    return of(this.categories = categories)
  }

  setCategories(categories: CategoryAddType[] | '{}' | null) {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categories$.next(categories);
  }


  getEditTask(): Observable<TaskAddType | '{}'> {
    const taskForEdit = JSON.parse(localStorage.getItem('taskForEdit') || '{}');
    return of(this.tasksForEdit = taskForEdit)
  }

  setEditTask(taskForEdit: TaskAddType | '{}') {
    localStorage.setItem('taskForEdit', JSON.stringify(taskForEdit));
    this.taskForEdit$.next(taskForEdit);
  }

  removeEditTask() {
    localStorage.removeItem('taskForEdit');
  }


  getEditCategory(): Observable<CategoryAddType | '{}'> {
    const categoryForEdit = JSON.parse(localStorage.getItem('categoryForEdit') || '{}');
    return of(this.categoryForEdit = categoryForEdit)
  }

  setEditCategory(categoryForEdit: CategoryAddType | '{}') {
    localStorage.setItem('categoryForEdit', JSON.stringify(categoryForEdit));
    this.categoryForEdit$.next(categoryForEdit);
  }

  removeEditCategory() {
    localStorage.removeItem('categoryForEdit');
  }
}
