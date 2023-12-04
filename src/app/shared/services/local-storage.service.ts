import {Injectable} from '@angular/core';
import {Observable, Subject, of} from "rxjs";
import {TaskAddType} from "../../../types/task-add.type";
import {CategoryAddType} from '../../../types/category-add.type';

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
    private tasksForEdit: TaskAddType | null = null;
    public taskForEdit$: Subject<TaskAddType | null> = new Subject<TaskAddType | null>();
    private categoryForEdit: CategoryAddType | null = null;
    public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();
    public userName: string | null = null;

    constructor() {
    }

    getTasks(): Observable<TaskAddType[] | null> {
        const tasks: TaskAddType[] | null = JSON.parse(localStorage.getItem('tasks') || '')
        return of(this.tasks = tasks);
    }

    setTasks(tasks: TaskAddType[] | null) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.tasks$.next(tasks);
    }


    getInfoTask(): Observable<TaskAddType | null> {
        const task = JSON.parse(localStorage.getItem('infoTask') || '');
        return of(this.taskInfo = task)
    }

    setInfoTask(infoTask: TaskAddType | null) {
        localStorage.setItem('infoTask', JSON.stringify(infoTask));
        this.taskInfo$.next(infoTask);
    }

    getCompleteTasks(): Observable<TaskAddType[] | null> {
        const tasksComplete = JSON.parse(localStorage.getItem('tasksComplete') || '')
        return of(this.tasksComplete = tasksComplete)
    }

    setCompleteTasks(tasksComplete: TaskAddType[] | null) {
        localStorage.setItem('tasksComplete', JSON.stringify(tasksComplete));
        this.tasksComplete$.next(tasksComplete);
    }

    getCategories(): Observable<CategoryAddType[] | null> {
        const categories = JSON.parse(localStorage.getItem('categories') || '')
        return of(this.categories = categories)
    }
    setCategories(categories: CategoryAddType[] | null) {
        localStorage.setItem('categories', JSON.stringify(categories));
        this.categories$.next(categories);
    }

    getEditTask(): Observable<TaskAddType | null> {
        const taskForEdit = JSON.parse(localStorage.getItem('taskForEdit') || '');
        return of(this.tasksForEdit = taskForEdit)
    }

    setEditTask(taskForEdit: TaskAddType | null) {
        localStorage.setItem('taskForEdit', JSON.stringify(taskForEdit));
        this.taskForEdit$.next(taskForEdit);
    }

    removeEditTask() {
        localStorage.removeItem('taskForEdit');
    }

    getEditCategory(): Observable<CategoryAddType | null> {
        const categoryForEdit = JSON.parse(localStorage.getItem('categoryForEdit') || '');
        return of(this.categoryForEdit = categoryForEdit)
    }

    setEditCategory(categoryForEdit: CategoryAddType | null) {
        localStorage.setItem('categoryForEdit', JSON.stringify(categoryForEdit));
        this.categoryForEdit$.next(categoryForEdit);
    }

    removeEditCategory() {
        localStorage.removeItem('categoryForEdit');
    }

    getUserName(): Observable<string> {
        const userName = JSON.parse(localStorage.getItem('user') || '').userInfo.name;
        return of(this.userName = userName)
    }
}
