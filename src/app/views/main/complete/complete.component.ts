import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TaskAddType } from 'src/types/task-add.type';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit{
  tasksComplete: TaskAddType[] | null= null;
  constructor(private ls: LocalStorageService) {}

  ngOnInit() {
    
  }
}
