import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    TuiButton,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HeaderComponent {
  public readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
