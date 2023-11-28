import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService, SortEvent } from "primeng/api";
import { TaskAddType } from "../../../../types/task-add.type";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { CategoryAddType } from 'src/types/category-add.type';
import { TASKS_COLUMNS } from '../../../shared/constants/constants'



@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TasksComponent implements OnInit {
  tasks: TaskAddType[] = [];
  categories: CategoryAddType[] = [];
  tasksComplete: TaskAddType[] = []
  addTaskVisible: boolean = false;
  addCategoryVisible: boolean = false;
  editTaskVisible: boolean = false;
  column: { field: string, header: string }[] = TASKS_COLUMNS;



  constructor(private messageService: MessageService,
    private ls: LocalStorageService,
    private confirmationService: ConfirmationService,
  ) { }



  ngOnInit() {
    this.ls.getTasks().subscribe((data: TaskAddType[] | '{}' | null) => {
      this.tasks = data as TaskAddType[]
    })

    this.ls.tasks$.subscribe((data: TaskAddType[] | '{}' | null) => {
      this.tasks = data as TaskAddType[]
    })

    this.ls.getCategories().subscribe((data: CategoryAddType[] | '{}') => {
      this.categories = data as CategoryAddType[];
    })

    this.ls.categories$.subscribe((data: CategoryAddType[] | '{}' | null) => {
      this.categories = data as CategoryAddType[] || '{}' || null
    })

    this.ls.getCompleteTasks().subscribe((data: TaskAddType[] | '{}') => {
      this.tasksComplete = data as TaskAddType[];
    })

    this.ls.tasksComplete$.subscribe((data: TaskAddType[] | '{}' | null) => {
      this.tasksComplete = data as TaskAddType[] || '{}' || null
    })
  }
    


  completeTask(task: TaskAddType) {
    let indexTaskInArray: number = this.tasks.findIndex(taskFromLS => taskFromLS.taskId === task.taskId);
    this.confirmationService.confirm({
      message: 'Вы выполнили данную задачу?',
      header: 'Выполнение',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexTaskInArray !== -1) {
          this.tasks.splice(indexTaskInArray, 1);
          let tasksArrayForLS = this.tasks;
          this.ls.setTasks(tasksArrayForLS)
          if (!localStorage.getItem('tasksComplete')) {
            this.ls.setCompleteTasks([task])
          } else {
            let tasksFromLS: TaskAddType[] = JSON.parse(localStorage.getItem('tasksComplete') || '{}');
            if (tasksFromLS === null) {
              tasksFromLS = []
            }
            let tasksArrayForLS = tasksFromLS.concat([task]);
            localStorage.removeItem('tasksComplete');
            this.ls.setCompleteTasks(tasksArrayForLS)
            // localStorage.setItem('tasksComplete', tasksArrayForLS);
            console.log(this.ls.getCompleteTasks)
          }
          this.ls.setTasks(JSON.parse(localStorage.getItem('tasks') || '{}'))
        }
        this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Задача перемещена в выполненные' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Вы передумали' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Отменено' });
            break;
        }
      }
    });
  }

  editTask(task: TaskAddType) {
    this.ls.setEditTask(task);
    this.editTaskVisible = !this.editTaskVisible;
  }

  openAddTaskMenu() {
    this.addTaskVisible = !this.addTaskVisible;
    this.ls.setEditTask('{}')
  }

  closeEditTaskMenu(value: boolean) {
    this.editTaskVisible = value;
  }

  closeAddTaskMenu(value: boolean) {
    this.addTaskVisible = value;
  }

  openAddCategoryMenu() {
    this.addCategoryVisible = !this.addCategoryVisible;
    this.ls.setEditCategory('{}')
  }

  closeAddCategory(value: boolean) {
    this.addCategoryVisible = value;
  }

  removeTask(task: any) {
    let indexTaskInArray: number = this.tasks.findIndex(taskFromLS => taskFromLS.taskId === task.taskId);
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить данную задачу?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexTaskInArray !== -1) {
          this.tasks.splice(indexTaskInArray, 1);
          let tasksArrayForLS = this.tasks;
          this.ls.setTasks(tasksArrayForLS)
        }
        this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Задача удалена' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Вы отменили удаление задачи' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Отменено' });
            break;
        }
      }
    });
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order as number * result;
    });
  }

}

