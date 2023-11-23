import { FormControl } from "@angular/forms";

export interface TaskFormInterface {
    taskName: FormControl<string | null>,
    taskDescription: FormControl<string | null>,
    taskDateSet: FormControl<Date | string | null>,
    taskDeadline: FormControl<Date | string | null>,
    taskPriority: FormControl<Object | string | null>,
    taskCategory?: FormControl<Object | string | null>,
}
