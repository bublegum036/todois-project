import { Component, Input } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { TaskAddType } from 'src/types/task-add.type';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'task-tr',
  templateUrl: './task-tr.component.html',
  styleUrls: ['./task-tr.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskTrComponent {
@Input() col!: any;
@Input() task!: any;


constructor(private messageService: MessageService,
  private ls: LocalStorageService,
  private confirmationService: ConfirmationService) {
}

editTask(task:any) {
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
