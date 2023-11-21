import { MenuItem, MenuItemCommandEvent } from "primeng/api";
import { PriorityType } from "src/types/priority.type";

export const priorityTasks: PriorityType[] = [
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

// export const menuItem: MenuItem[] = [
//     {
//       label: 'Создать задачу',
//       icon: 'pi pi-plus-circle',
//       command: (event: MenuItemCommandEvent) => {
//         this.openAddTaskMenu();
//       }
//     },
//     {
//       label: 'Создать категорию',
//       icon: 'pi pi-plus-circle',
//       command: (event: MenuItemCommandEvent) => {
//         this.openAddCategoryMenu()
//       }
//     },
//     {
//       label: 'Все задачи',
//       icon: 'pi pi-prime',
//       routerLink: ['/tasks']
//     },
//     {
//       label: 'Категории задач',
//       icon: 'pi pi-list',
//       routerLink: ['/task-category']
//     },
//     {
//       label: 'Выйти',
//       icon: 'pi pi-sign-out',
//       command: (event: MenuItemCommandEvent) => {
//         this.auth.logout()
//       }
//     },
//   ];