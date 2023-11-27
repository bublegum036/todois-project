import { Component, OnInit } from '@angular/core';
import { MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;
  userName!: string;
  userNameFofAvatar: string | null = null;
  items: any;


  constructor(private ls: LocalStorageService,
    private auth: AuthService) {

  }

  ngOnInit(): void {
    this.ls.getUserName().subscribe(name => {
      this.userName = name;
    });

    if (this.userName) {
      this.userNameFofAvatar = this.userName[0]
    }

    this.items = [
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: (event: MenuItemCommandEvent) => {
          this.auth.logout()
        }
      }
    ]

  }

  sidebarOpen() {
    this.sidebarVisible = !this.sidebarVisible
  }


}
