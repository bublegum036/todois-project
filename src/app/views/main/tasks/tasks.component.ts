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
    private confirmationService: ConfirmationService) {
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
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  removeTask(task:any) {
    console.log(task)
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

}

