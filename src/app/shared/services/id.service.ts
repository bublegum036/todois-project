import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IdService {
  private taskId = new BehaviorSubject<number>(1);
  public taskId$ = this.taskId.asObservable();

  private categoryId = new BehaviorSubject<number>(1);
  public categoryId$ =this.categoryId.asObservable();

  constructor() { }

  saveTaskId() {
    const taskId = this.taskId.getValue();
    const nextTaskId = taskId +1;
    this.taskId.next(nextTaskId)
  }

  saveCategoryId() {
    const categoryId = this.categoryId.getValue();
    const nextCategoryId = categoryId +1;
    this.categoryId.next(nextCategoryId)
  }
}
