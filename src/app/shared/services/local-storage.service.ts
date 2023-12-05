import { Injectable } from '@angular/core';
import { Observable, Subject, of } from "rxjs";
import { TaskAddType } from "../../../types/task-add.type";
import { CategoryAddType } from '../../../types/category-add.type';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    private tasks: TaskAddType[] | null = null;
    public tasks$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
    private tasksComplete: TaskAddType[] | null = null;
    public tasksComplete$: Subject<TaskAddType[] | null> = new Subject<TaskAddType[] | null>();
    private categories: CategoryAddType[] | null = null;
    public categories$: Subject<CategoryAddType[] | null> = new Subject<CategoryAddType[] | null>();
    private taskInfo: TaskAddType | null = null;
    public taskInfo$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
    private taskForEdit: TaskAddType | null = null;
    public taskForEdit$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
    private categoryForEdit: CategoryAddType | null = null;
    public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();
    public userName: string | null = null;

    constructor() {
    }

    getTasks(): Observable<TaskAddType[] | null> {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            this.setTasks(null);
            this.tasks = null;
        }
        return of(this.tasks)
    }

    setTasks(tasks: TaskAddType[] | null) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.tasks$.next(tasks);
    }

    getInfoTask(): Observable<TaskAddType | null> {
        const task = localStorage.getItem('infoTask');
        if (task) {
            this.taskInfo = JSON.parse(task)
        } else {
            this.setInfoTask(null);
            this.taskInfo = null
        }
        return of(this.taskInfo)
    }

    setInfoTask(infoTask: TaskAddType | null) {
        localStorage.setItem('infoTask', JSON.stringify(infoTask));
        this.taskInfo$.next(infoTask);
    }

    getCompleteTasks(): Observable<TaskAddType[] | null> {
        const tasksComplete = localStorage.getItem('tasksComplete');
        if (tasksComplete) {
            this.tasksComplete = JSON.parse(tasksComplete)
        } else {
            this.setCompleteTasks(null);
            this.tasksComplete = null;
        }
        return of(this.tasksComplete)
    }

    setCompleteTasks(tasksComplete: TaskAddType[] | null) {
        localStorage.setItem('tasksComplete', JSON.stringify(tasksComplete));
        this.tasksComplete$.next(tasksComplete);
    }

    getCategories(): Observable<CategoryAddType[] | null> {
        const categories = localStorage.getItem('categories')
        if (categories) {
            this.categories = JSON.parse(categories)
        } else {
            this.setCategories(null)
            this.categories = null;
        }
        return of(this.categories)
    }

    setCategories(categories: CategoryAddType[] | null) {
        localStorage.setItem('categories', JSON.stringify(categories));
        this.categories$.next(categories);
    }

    getEditTask(): Observable<TaskAddType | null> {
        const taskForEdit = localStorage.getItem('taskForEdit');
        if(taskForEdit) {
            this.taskForEdit = JSON.parse (taskForEdit)
        } else {
            this.setEditTask(null);
            this.taskForEdit = null
        }
        return of(this.taskForEdit)
    }

    setEditTask(taskForEdit: TaskAddType | null) {
        localStorage.setItem('taskForEdit', JSON.stringify(taskForEdit));
        this.taskForEdit$.next(taskForEdit);
    }

    getEditCategory(): Observable<CategoryAddType | null> {
        const categoryForEdit = localStorage.getItem('categoryForEdit');
        if(categoryForEdit) {
            this.categoryForEdit = JSON.parse(categoryForEdit);
        } else {
            this.setEditCategory(null);
            this.categoryForEdit = null;
        }
        return of(this.categoryForEdit)
    }

    setEditCategory(categoryForEdit: CategoryAddType | null) {
        localStorage.setItem('categoryForEdit', JSON.stringify(categoryForEdit));
        this.categoryForEdit$.next(categoryForEdit);
    }

    getUserName(): Observable<string> {
        const userName = JSON.parse(localStorage.getItem('user') || '').userInfo.name;
        return of(this.userName = userName)
    }

    removeUserProfile() {
        localStorage.clear()
    }
}
