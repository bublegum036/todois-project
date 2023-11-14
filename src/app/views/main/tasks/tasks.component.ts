import {Component, OnInit} from '@angular/core';
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
  tasks: TaskAddType[] = [];

  constructor(private messageService: MessageService,
              private ls: LocalStorageService) {
  }

  ngOnInit() {
    this.ls.getTasks().subscribe((data: TaskAddType[] | '{}') => {
      this.tasks = data as TaskAddType[]
    })


    this.ls.tasks$.subscribe((data: TaskAddType[] | '{}') => {
      this.tasks = data as TaskAddType[]
    })
  }


  editTask() {
    console.log('bl')
  }

  removeTask() {
    console.log('bl')
  }
}

