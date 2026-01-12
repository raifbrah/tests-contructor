import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Test } from './interfaces/test.interface';
import { QuestionComponent } from './components/question/question.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TestsService } from '../../services/tests.service';
import { TestType } from './interfaces/test-type.interface';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  standalone: true,
  imports: [TuiButton, FormsModule, QuestionComponent, RouterLink, NgClass],
})
export class TestComponent {
  public testType: TestType = 'create';
  public test!: Test;

  private readonly authService = inject(AuthService);
  private readonly testsService = inject(TestsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const test_type = params['type'];

      if (test_type) {
        this.testType = test_type;
      }

      if (test_type !== 'create') {
        const testId = Number(params['id']);
        const test = this.testsService.testsList.find(
          (test) => test.id === testId,
        );
        if (test) {
          this.test = { ...test };
        }
      } else {
        this.test = {
          id: Date.now(),
          name: '',
          author_id: this.authService.currentUser()!.id,
          created_at: Date.now(),
          questions: [],
        };
      }
    });
  }

  public addNewQuestion(): void {
    this.test.questions = [
      ...this.test.questions,
      {
        id: Date.now(),
        description: '',
        type: 'multiple',
        group_answer: null,
        order: 3,
        theUserAnsweredCorrectly: false,
        answers: [],
      },
    ];
  }

  public removeQuestion(removeQuestionId: number): void {
    this.test.questions = this.test.questions.filter(
      (question) => question.id !== removeQuestionId,
    );
  }

  public saveTest(): void {
    this.testsService.createNewTest(this.test);
    this.router.navigate(['']);
  }

  public completeTest(): void {
    this.testsService.completeTest({ ...this.test });
    this.router.navigate(['passed-tests']);
  }
}
