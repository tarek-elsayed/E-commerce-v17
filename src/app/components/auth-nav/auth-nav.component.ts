import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [Menubar,MenubarModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss',
})
export class AuthNavComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
  }
}
