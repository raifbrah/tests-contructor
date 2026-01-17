import { inject, Injectable } from '@angular/core';
import { Test } from '../features/test/interfaces/test.interface';
import { LocalStorageService } from './localstorage.service';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authService = inject(AuthService);

  constructor() {
    this.loadAllTests();
  }

  public createNewTest(newTest: Test): void {
    const isTest = this.testsList.some((test) => test.id === newTest.id);

    if (isTest) {
      this.updateTest(newTest);
    } else {
      this.testsList = [...this.testsList, { ...newTest }];
    }

    this.save();
  }

  public updateTest(updateTest: Test): void {
    const updateTestIndex = this.testsList.findIndex(
      (test) => test.id === updateTest.id,
    );
    this.testsList[updateTestIndex] = { ...updateTest };

    this.save();
  }

  public loadAllTests(): void {
    const tests: Test[] | null = this.localStorageService.load('tests');
    const completedTests: Test[] | null =
      this.localStorageService.load('completed-tests');
    if (tests) this.testsList = [...tests];
    if (completedTests) this.completedTestsList = [...completedTests];
  }

  public deleteTest(testId: number): void {
    this.testsList = this.testsList.filter((test) => test.id !== testId);
    this.save();
  }

  public deletePassedTest(testId: number): void {
    this.completedTestsList = this.completedTestsList.filter(
      (test) => test.id !== testId,
    );
    this.save();
  }

  public completeTest(test: Test) {
    let completionTest = { ...test };
    let numberOfCorrectAnswers = 0;
    const numberOfQuestions = completionTest.questions.length;
    const currentUserId = this.authService.currentUser()!.id;

    completionTest.questions.map((question) => {
      if (question.type === 'single') {
        question.answers.map((answer) => {
          if (Number(question.group_answer) === answer.id && answer.correct) {
            numberOfCorrectAnswers++;
            question.theUserAnsweredCorrectly = true;
          }
        });
      } else {
        const incrorrectAnswers = question.answers.some(
          (answer) => answer.correct === false && answer.checked,
        );
        const correctAnswers = question.answers.some(
          (answer) => answer.correct && answer.checked,
        );

        if (!incrorrectAnswers && correctAnswers) {
          numberOfCorrectAnswers++;
          question.theUserAnsweredCorrectly = true;
        }
      }
    });

    if (!test.participants.includes(currentUserId!)) {
      test.participants.push(currentUserId!);
    }

    test.passed_at = Date.now();
    test.result = `${numberOfCorrectAnswers}/${numberOfQuestions}`;
    test.complete_user_id = this.authService.currentUser()!.id;
    this.completedTestsList = this.completedTestsList.filter(
      (oldTest) => oldTest.id !== test.id,
    );
    this.completedTestsList.push(test);
    this.save();
  }

  public save(): void {
    this.localStorageService.save('tests', this.testsList);
    this.localStorageService.save('completed-tests', this.completedTestsList);
  }

  public testsList: Test[] = [
    {
      id: 1,
      name: 'Тест 1',
      created_at: Date.now(),
      participants: [],
      passed_at: Date.now(),
      questions: [],
    },
  ];

  public completedTestsList: Test[] = [];
}
