import {Component, OnInit} from '@angular/core';
import {ConfirmEventType, ConfirmationService, MessageService} from "primeng/api";
import {TASKS_COLUMNS} from 'src/app/shared/constants/constants';
import {LocalStorageService} from 'src/app/shared/services/local-storage.service';
import {TaskAddType} from 'src/types/task-add.type';

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CompleteComponent implements OnInit {
    tasksComplete: TaskAddType[] | null = [];
    column: { field: string, header: string }[] = TASKS_COLUMNS;

    constructor(private ls: LocalStorageService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
    ) {
    }

    ngOnInit() {
        this.ls.getCompleteTasks().subscribe((data: TaskAddType[] | null) => {
            this.tasksComplete = data;
        })

        this.ls.tasksComplete$.subscribe((data: TaskAddType[] | null) => {
            this.tasksComplete = data
        })
    }

    removeCompleteTasks() {
        this.confirmationService.confirm({
            message: 'Вы хотите удалить выпполненные задачи?',
            header: 'Выполнение',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.ls.setCompleteTasks([]);
                this.messageService.add({severity: 'info', summary: 'Успешно', detail: 'Выполненные задачи очищены'});
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({severity: 'error', summary: 'Отклонено', detail: 'Вы передумали'});
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({severity: 'warn', summary: 'Отмена', detail: 'Отменено'});
                        break;
                }
            }
        });
    }
}
