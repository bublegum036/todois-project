import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { TaskAddType } from 'src/types/task-add.type';

@Injectable({
  providedIn: 'root'
})
export class TaskEditService {
  private tasksForEdit: TaskAddType | '{}' = JSON.parse(localStorage.getItem('tasksForEdit') || '{}');
  public tasksForEdit$: Subject<TaskAddType | '{}'> = new Subject<TaskAddType | '{}'>;


  constructor() { }

  getEditTask(): Observable<TaskAddType | '{}'> {
    const taskForEdit = JSON.parse(localStorage.getItem('tasksForEdit') || '{}');
    return of(this.tasksForEdit = taskForEdit)
  }

  setEditTask(taskForEdit: TaskAddType | '{}') {
    localStorage.setItem('tasksForEdit', JSON.stringify(taskForEdit));
    this.tasksForEdit$.next(taskForEdit);
  }

}
