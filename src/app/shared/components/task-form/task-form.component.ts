import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { TaskAddType } from "../../../../types/task-add.type";
import { LocalStorageService } from '../../services/local-storage.service';
import { IdService } from '../../services/id.service';
import { CategoryAddType } from '../../../../types/category-add.type';
import { PRIORITY_TASKS } from '../../constants/constants';
import { PriorityType } from '../../../../types/priority.type';
import { TaskFormInterface } from '../../interfaces/task-form-interface';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  priority: PriorityType[] = PRIORITY_TASKS;
  taskCategory: CategoryAddType[] | [] = [];
  taskId: number = 0;
  taskForEdit: TaskAddType | null = null;
  isButton: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  taskForm: FormGroup = new FormGroup<TaskFormInterface>({
    taskName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]),
    taskDescription: new FormControl(null, [Validators.required, Validators.maxLength(256), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]),
    taskDateSet: new FormControl(null, Validators.required),
    taskDeadline: new FormControl(null, Validators.required),
    taskPriority: new FormControl(null, Validators.required),
    taskCategory: new FormControl(null),
  })


  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private ls: LocalStorageService,
    private idService: IdService,
  ) { }


  ngOnInit() {
    this.ls.getEditTask().subscribe((data: TaskAddType | null) => {
      if (typeof data === 'object') {
        this.isButton = false;
      } else {
        this.isButton = true;
      }
      this.taskForEdit = data;
    })

    this.ls.taskForEdit$.subscribe((data: TaskAddType | null) => {
      if (data) {
        this.isButton = false;
        this.taskForm.patchValue({
          taskName: data.taskName,
          taskDescription: data.taskDescription,
          taskDateSet: data.taskDateSet,
          taskDeadline: data.taskDeadline,
          taskPriority: this.priority.find(item => item.label === data.taskPriority),
          taskCategory: this.taskCategory?.find(item => item.label === data.taskCategory),
        })
      } else {
        this.isButton = true;
        this.taskForm.reset();
      }
      this.taskForEdit = data;
    })

    this.ls.getCategories().subscribe(data => {
      if (data !== null) {
        this.taskCategory = data;
      }
    })

    this.ls.categories$.subscribe((data: CategoryAddType[] | null) => {
      if (data !== null) {
        this.taskCategory = data;
      }
    })

    this.idService.taskId$.subscribe(taskId => {
      this.taskId = taskId
    })
  }

  createTask() {
    if (this.taskForm.valid
      && this.taskForm.value.taskName
      && this.taskForm.value.taskDescription
      && this.taskForm.value.taskDateSet
      && this.taskForm.value.taskDeadline
      && this.taskForm.value.taskPriority
    ) {

      let task: TaskAddType = {
        taskName: this.taskForm.value.taskName,
        taskDescription: this.taskForm.value.taskDescription,
        taskDateSet: new Date(this.taskForm.value.taskDateSet).toLocaleDateString(),
        taskDeadline: new Date(this.taskForm.value.taskDeadline).toLocaleDateString(),
        taskPriority: Object(this.taskForm.value.taskPriority).label,
        taskCategory: Object(this.taskForm.value.taskCategory).label,
        taskId: this.taskId
      }

      if (this.ls.getTasks() === null) {
        this.ls.setTasks([task])
        this.saveNewId()
        this.closeAndCleanForm();
      } else {
        let tasksFromLS: TaskAddType[] = JSON.parse(localStorage.getItem('tasks') || '{}');
        if (tasksFromLS === null) {
          tasksFromLS = []
        }
        let tasksArrayForLS = tasksFromLS.concat([task]);
        this.ls.setTasks(tasksArrayForLS)
        this.saveNewId()
        this.closeAndCleanForm();
      }
    }
  }

  editTask() {
    if (this.taskForEdit !== null) {
      if (this.taskForm.valid
        && this.taskForm.value.taskName
        && this.taskForm.value.taskDescription
        && this.taskForm.value.taskDateSet
        && this.taskForm.value.taskDeadline
        && this.taskForm.value.taskPriority
        && this.taskForm.value.taskCategory) {
        let taskDateSet = null;
        let taskDeadline = null;
        if (typeof this.taskForm.value.taskDateSet === 'string') {
          taskDateSet = this.taskForm.value.taskDateSet
        } else {
          taskDateSet = new Date(this.taskForm.value.taskDateSet).toLocaleDateString()
        }
        if (typeof this.taskForm.value.taskDeadline === 'string') {
          taskDeadline = this.taskForm.value.taskDeadline
        } else {
          taskDeadline = new Date(this.taskForm.value.taskDeadline).toLocaleDateString()
        }
        let task: TaskAddType = {
          taskName: this.taskForm.value.taskName,
          taskDescription: this.taskForm.value.taskDescription,
          taskDateSet: taskDateSet,
          taskDeadline: taskDeadline,
          taskPriority: Object(this.taskForm.value.taskPriority).label,
          taskCategory: Object(this.taskForm.value.taskCategory).label,
          taskId: this.taskForEdit.taskId
        }

        let tasksFromLS: TaskAddType[] = JSON.parse(localStorage.getItem('tasks') || '{}');
        let indexTaskInArray: number = tasksFromLS.findIndex(taskFromLS => taskFromLS.taskId === task.taskId);
        if (indexTaskInArray !== -1) {
          tasksFromLS.splice(indexTaskInArray, 1, task);
          this.ls.setTasks(tasksFromLS)
          this.closeAndCleanForm()
        }
      }
    }
  }

  closeAndCleanForm() {
    if (!this.isButton) {
      this.messageService.add({ severity: 'success', summary: 'Успешно!', detail: 'Задача отредактирована' })
    } else {
      this.messageService.add({ severity: 'success', summary: 'Успешно!', detail: 'Задача создана' })
    }
    setTimeout(() => {
      this.visibleChange.emit(false);
      this.taskForm.reset();
    }, 500);
  }

  saveNewId() {
    this.idService.saveTaskId()
  }

  findPriorityByLabel(label: string) {
    const foundPriority = this.priority?.find(priority => priority.label === label);
    return foundPriority ? foundPriority.data : null;
  }
}
