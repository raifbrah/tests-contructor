import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Answer, Question } from '../../interfaces/test.interface';
import { NgClass } from '@angular/common';
import { TestsService } from '../../../../services/tests.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
  standalone: true,
  imports: [FormsModule, TuiButton, NgClass],
})
export class AnswerComponent {
  @Input() answer!: Answer;
  @Input() testType!: string;
  @Input() question!: Question;
  @Output() removeAnswer = new EventEmitter();

  private readonly testsService = inject(TestsService);

  public onRemoveAnswer(): void {
    this.removeAnswer.emit();
  }

  public saveAnswer() {
    this.testsService.save();
  }
}
