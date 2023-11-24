import { PriorityType } from "../../../types/priority.type";

export const PRIORITY_TASKS: PriorityType[] = [
    {
        label: 'Приоритет 1',
        data: 'Приоритет 1',
        icon: 'pi pi-angle-double-up'
    },
    {
        label: 'Приоритет 2',
        data: 'Приоритет 2',
        icon: 'pi pi-angle-up'

    },
    {
        label: 'Приоритет 3',
        data: 'Приоритет 3',
        icon: 'pi pi-arrow-right'
    },
    {
        label: 'Приоритет 4',
        data: 'Приоритет 4',
        icon: 'pi pi-arrow-down-right'
    },
];

export const TASKS_COLUMNS: { field: string, header: string }[] = [
    { field: 'taskName', header: 'Название задачи' },
    { field: 'taskDescription', header: 'Описание задачи' },
    { field: 'taskDateSet', header: 'Дата постановки' },
    { field: 'taskDeadline', header: 'Срок выполнения' },
    { field: 'taskPriority', header: 'Приоритет' },
    { field: 'taskCategory', header: 'Категория' },
];