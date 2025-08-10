import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../core/service/user-data.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/moduls/shared/shared.module';

@Component({
  selector: 'app-user-nav',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    BadgeModule,
    SharedModule,
  ],
  standalone: true,
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {
  items: MenuItem[] | undefined;
  logout: boolean = false;
  userName: string = '';
  cartCount: number = 0;
  constructor(
    private _userData: UserDataService,
    private _auth: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getUserName();
    this.getCartCount();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: 'home',
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        path: 'products',
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        path: 'category',
      },
    ];
  }
  getUserName(): void {
    this._userData.userName.subscribe((name: string) => {
      this.userName = name;
    });
  }
  getCartCount() {
    const userId = localStorage.getItem('token') ?? '';

    this._userData.getCartCount(userId).subscribe((res: any) => {
      console.log(res.cart.length);
      console.log(res.cart.length);
      this.cartCount = res.cart.length;
    });
  }

  logOut(): void {

    this._auth.logOutUser().subscribe((res: any) => {
      if (res) {
        this.showToster('warn', 'Warn', res.message);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this._router.navigate(['login'])
      }
      // this._router.navigate(['login'])
    });
  }
  showToster(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
