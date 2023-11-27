import { Component, Input } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarVisible: boolean = true;

  constructor(private sidebarService: SidebarService) {}

  sidebarOpen(value: boolean) {
    this.sidebarVisible = false;
  }
}



