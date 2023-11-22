import { FormControl } from "@angular/forms";

export interface TaskFormInterface {
    taskName: FormControl<string | null>,
    taskDescription: FormControl<string | null>,
    taskDateSet: FormControl<string | null>,
    taskDeadline: FormControl<string | null>,
    taskPriority: FormControl<string | null>,
    taskCategory: FormControl<string | null>,
}
