import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  public sidebarVisible: boolean = false;

  getSidebarVisible(): boolean {
    return this.sidebarVisible;
  }

  setSidebarVisible(value: boolean) {
    this.sidebarVisible = value;
  }
}
