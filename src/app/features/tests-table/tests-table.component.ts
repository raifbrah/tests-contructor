import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Test } from '../test/interfaces/test.interface';
import { AuthService } from '../../core/auth/auth.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'tests-table',
  templateUrl: './tests-table.component.html',
  styleUrl: './tests-table.component.scss',
  standalone: true,
  imports: [TuiButton, DatePipe, RouterModule],
})
export class TestsTableComponent {
  public testsType: string = '';

  public readonly authService = inject(AuthService);
  public readonly testsService = inject(TestsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  getTests(testType?: 'completed') {
    if (testType !== 'completed') {
      return this.testsService.testsList.filter(
        (test) => test.author_id === this.authService.currentUser()!.id,
      );
    }

    return this.testsService.completedTestsList.filter(
      (test) => test.author_id === this.authService.currentUser()!.id,
    );
  }

  ngOnInit(): void {
    this.testsType = this.route.snapshot.url.at(-1)?.path ?? '';
  }

  editTest(test: Test): void {
    this.router.navigate(['/test'], {
      queryParams: { id: test.id, type: 'edit' },
    });
  }

  deleteTest(test: Test): void {
    this.testsService.deleteTest(test.id);
  }

  openTest(test: Test): void {
    this.router.navigate(['/test'], {
      queryParams: { id: test.id, type: 'passing' },
    });
  }
  watchTest(test: Test): void {
    this.router.navigate(['/test'], {
      queryParams: { id: test.id, type: 'watch' },
    });
  }
}
