import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MessageService, SortEvent} from "primeng/api";
import {TaskAddType} from "../../../../types/task-add.type";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../../shared/services/local-storage.service";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService]
})
export class TasksComponent implements OnInit {
  tasks: any = [];

  constructor(private messageService: MessageService,
              private ls: LocalStorageService) {
  }

  ngOnInit() {
    this.ls.getTasks().subscribe(data => {
      if (data) {
        this.tasks = data;
      }
    })
  }
}

