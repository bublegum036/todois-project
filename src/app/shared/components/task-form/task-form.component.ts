import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { TaskAddType } from "../../../../types/task-add.type";
import { LocalStorageService } from '../../services/local-storage.service';
import { IdService } from '../../services/id.service';


@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  priority: any[] | undefined;
  taskCategory: any[] | undefined;
  taskId: number = 0;
  taskForEdit: TaskAddType | '{}' = '{}';
  isButton: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private ls: LocalStorageService,
    private idService: IdService,
  ) { }

  taskForm = this.fb.group({
    taskName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDescription: ['', [Validators.required, Validators.maxLength(256), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
    taskDateSet: ['', [Validators.required]],
    taskDeadline: ['', [Validators.required]],
    taskPriority: ['', [Validators.required]],
    taskCategory: ['', [Validators.required]],
  })


  ngOnInit() {
    this.ls.getEditTask().subscribe((data: TaskAddType | '{}') => {
      if (typeof data === 'object') {
        this.isButton = false;
      } else {
        this.isButton = true;
      }
      this.taskForEdit = data;
      console.log(this.taskForEdit)
    })

    this.ls.taskForEdit$.subscribe((data: TaskAddType | '{}') => {
      if (typeof data === 'object') {
        this.isButton = false;
        this.taskForm = this.fb.group({
          taskName: [data.taskName, [Validators.required, Validators.maxLength(30), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
          taskDescription: [data.taskDescription, [Validators.required, Validators.maxLength(256), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
          taskDateSet: [data.taskDateSet, [Validators.required]],
          taskDeadline: [data.taskDeadline, [Validators.required]],
          taskPriority: ['', [Validators.required]],
          taskCategory: ['', [Validators.required]],
        })
      } else {
        this.isButton = true;
        this.taskForm = this.fb.group({
          taskName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
          taskDescription: ['', [Validators.required, Validators.maxLength(256), Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s\\p{P}]+$')]],
          taskDateSet: ['', [Validators.required]],
          taskDeadline: ['', [Validators.required]],
          taskPriority: ['', [Validators.required]],
          taskCategory: ['', [Validators.required]],
        })
      }
      this.taskForEdit = data;
      console.log(this.taskForEdit)
    })


    this.priority = [
      {
        label: 'Высокий',
        data: 'Высокий',
        icon: 'pi pi-angle-double-up'
      },
      {
        label: 'Обычный',
        data: 'Обычный',
        icon: 'pi pi-angle-up'

      },
      {
        label: 'Низкий',
        data: 'Низкий',
        icon: 'pi pi-arrow-right'
      },
      {
        label: 'Очень низкий',
        data: 'Очень низкий',
        icon: 'pi pi-arrow-down-right'
      },
    ]

    this.ls.getCategories()
      .subscribe(data => {
        if (data) {
          this.taskCategory = data as any
        }
      })

    this.ls.categories$
      .subscribe((data: any[] | '{}') => {
        this.taskCategory = data as any[]
      })


    this.idService.taskId$
      .subscribe(taskId => {
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
      && this.taskForm.value.taskCategory) {

      let task: TaskAddType = {
        taskName: this.taskForm.value.taskName,
        taskDescription: this.taskForm.value.taskDescription,
        taskDateSet: new Date(this.taskForm.value.taskDateSet).toLocaleDateString(),
        taskDeadline: new Date(this.taskForm.value.taskDeadline).toLocaleDateString(),
        taskPriority: Object(this.taskForm.value.taskPriority).label,
        taskCategory: Object(this.taskForm.value.taskCategory).label,
        taskId: this.taskId
      }

      if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([task]));
        this.saveNewId()
        this.closeAndCleanForm();
        console.log(localStorage.getItem('tasks'))
      } else {
        let tasksFromLS: TaskAddType[] = JSON.parse(localStorage.getItem('tasks') || '{}');
        let tasksArrayForLS: string = JSON.stringify(tasksFromLS.concat([task]));
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', tasksArrayForLS);
        this.saveNewId()
        this.closeAndCleanForm();
        console.log(localStorage.getItem('tasks'))
      }
      this.ls.saveTasks(JSON.parse(localStorage.getItem('tasks') || '{}'))
    }
  }


  editTask() {
    if (this.taskForEdit !== '{}') {
      if (this.taskForm.valid
        && this.taskForm.value.taskName
        && this.taskForm.value.taskDescription
        && this.taskForm.value.taskDateSet
        && this.taskForm.value.taskDeadline
        && this.taskForm.value.taskPriority
        && this.taskForm.value.taskCategory) {
        let task: TaskAddType = {
          taskName: this.taskForm.value.taskName,
          taskDescription: this.taskForm.value.taskDescription,
          taskDateSet: new Date(this.taskForm.value.taskDateSet).toLocaleDateString(),
          taskDeadline: new Date(this.taskForm.value.taskDeadline).toLocaleDateString(),
          taskPriority: Object(this.taskForm.value.taskPriority).label,
          taskCategory: Object(this.taskForm.value.taskCategory).label,
          taskId: this.taskForEdit.taskId
        }
        let tasksFromLS: TaskAddType[] = JSON.parse(localStorage.getItem('tasks') || '{}');
        let indexTaskInArray: number = tasksFromLS.findIndex(taskFromLS => taskFromLS.taskId === task.taskId);
        if (indexTaskInArray !== -1) {
          tasksFromLS.splice(indexTaskInArray, 1, task);
          localStorage.removeItem('tasks');
          localStorage.setItem('tasks', JSON.stringify(tasksFromLS));
          this.closeAndCleanForm()
        }
        this.ls.saveTasks(JSON.parse(localStorage.getItem('tasks') || '{}'))
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
