import { Component } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/question.model';
import { Answer } from '../model/answer.model';
import {QuestionService} from "../services/question.service";


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent {
  constructor(
    protected authService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private questionService: QuestionService
  ) {}

  question: Question | undefined;
  answers: Answer[] | undefined;
  author: string | undefined;
  answerText: string | undefined;

  ngOnInit(): void {
    //setTimeout(() => { this.ngOnInit() }, 100 * 10)


    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.questionService.getQuestions().subscribe(data => {
      this.question = data.find((q: any) => q.id === id);
      this.answers = this.question?.answers;
      if (this.question) {
        this.questionService.getAuthorByQuestion(this.question).subscribe(user => {
          this.author = user.username;
        });
        if (this.question.answers && this.question.answers.length > 0) {
          this.question.answers.forEach(answer => {
            this.questionService.getAuthor(answer.authorId).subscribe(user => {
              answer.author = user.username;
            });
          });
        }
      }
    });

  }

  onSubmit() {
    this.authService.getCurrentUserId().subscribe(userId => {
      const answer = {
        id: Math.ceil(Math.random() * 100),
        text: this.answerText,
        authorId: userId,
      };

      const questionId = this.question?.id;
      const newAnswers = [...(this.question?.answers ?? []), answer];
      const updatedQuestion = { ...this.question, answers: newAnswers };

      this.questionService.updateQuestion(questionId, updatedQuestion)
        .subscribe((updatedQuestion) => {
          this.question = updatedQuestion;
          this.answerText = '';
        });
    });
  }


}
