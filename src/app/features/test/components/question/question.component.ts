import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { Question } from '../../interfaces/test.interface';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  standalone: true,
  imports: [TuiButton, AnswerComponent, FormsModule, NgClass],
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() questionIndex!: number;
  @Input() testType!: string;

  @Output() removeQuestion = new EventEmitter();

  public onRemoveQuestion(): void {
    this.removeQuestion.emit();
  }

  public removeAnswer(answerId: number): void {
    this.question.answers = this.question.answers.filter((answer) => answer.id !== answerId);
  }

  public addNewAnswer(): void {
    this.question.answers = [
      ...this.question.answers,
      {
        id: Date.now(),
        value: '',
        correct: false,
        checked: false,
      },
    ];
  }

  public changeQuestionType() {
    this.question.type = this.question.type === 'multiple' ? 'single' : 'multiple';
    this.question.answers.map((answer) => (answer.checked = false));
  }
}
