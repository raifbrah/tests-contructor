import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {
  TuiButton,
  TuiGroup,
  TuiIcon,
  TuiPopup,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    TuiButton,
    RouterLink,
    RouterLinkActive,
    TuiDrawer,
    TuiButton,
    TuiTextfield,
    TuiPopup,
    TuiIcon,
    TuiGroup,
  ],
})
export class HeaderComponent {
  public readonly authService = inject(AuthService);
  public readonly isSidebarOpen = signal(false);

  logout(): void {
    this.authService.logout();
  }

  public onSidebarClose(): void {
    this.isSidebarOpen.set(false);
  }
}
