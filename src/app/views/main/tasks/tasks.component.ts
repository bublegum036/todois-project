import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService, SortEvent } from "primeng/api";
import { TaskAddType } from "../../../../types/task-add.type";
import { LocalStorageService } from "../../../shared/services/local-storage.service";



@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TasksComponent implements OnInit {
  tasks: TaskAddType[] = [];
  column: { field: string, header: string }[] | undefined = [];

  constructor(private messageService: MessageService,
    private ls: LocalStorageService,
    private confirmationService: ConfirmationService,
    ) {
  }



  ngOnInit() {
    this.ls.getTasks().subscribe((data: TaskAddType[] | '{}') => {
      this.tasks = data as TaskAddType[]
    })


    this.ls.tasks$.subscribe((data: TaskAddType[] | '{}') => {
      this.tasks = data as TaskAddType[]
    })

    
    this.column = [
      { field: 'taskName', header: 'Название задачи' },
      { field: 'taskDescription', header: 'Описание задачи' },
      { field: 'taskDateSet', header: 'Дата постановки' },
      { field: 'taskDeadline', header: 'Срок выполнения' },
      { field: 'taskPriority', header: 'Приоритет' },
      { field: 'taskCategory', header: 'Категория' },
      // { field: 'Actions', header: 'Действия' }/
    ];
  }



  editTask(task: any) {

  }

  removeTask(task: any) {
    
    let indexTaskInArray: number = this.tasks.findIndex(taskFromLS => taskFromLS.taskId === task.taskId);
    console.log(indexTaskInArray)
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить данную задачу?',
      header: 'Удаление',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (indexTaskInArray !== -1) {
          this.tasks.splice(indexTaskInArray, 1);
          let tasksArrayForLS = JSON.stringify(this.tasks)
          localStorage.removeItem('tasks');
          localStorage.setItem('tasks', tasksArrayForLS);
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

}

