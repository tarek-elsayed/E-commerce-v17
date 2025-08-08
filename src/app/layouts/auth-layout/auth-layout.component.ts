import { Component } from '@angular/core';
import { AuthNavComponent } from "../../components/auth-nav/auth-nav.component";
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-auth-layout',
  standalone:true,
  imports: [AuthNavComponent, AuthFooterComponent, RouterOutlet,MenubarModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
