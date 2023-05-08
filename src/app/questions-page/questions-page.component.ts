import { Component } from '@angular/core';
import {AuthenticationService} from "../services/auth.service";
import { HttpClient } from '@angular/common/http';
import {Question} from "../model/question.model";
import {QuestionService} from "../services/question.service";
import {User} from "../model/user.model";


@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent {
  constructor(protected authService:AuthenticationService,
              private http: HttpClient,
              private questionService: QuestionService) { }
  questions: Question[] | undefined;
  newQuestionDescription: string  = '';
  newQuestionTitle: string = '';

  ngOnInit() {
    this.questionService.getQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.getAuthors();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAuthors() {
    if (this.questions) {
      this.questions.forEach((question) => {
        if (question) {
          this.questionService.getAuthor(question.authorId).subscribe(user => {
            question.author = user.username;
          });
        }
      });
    }
  }


  onSubmit() {
    this.authService.getCurrentUserId().subscribe(userId => {
      const question = {
        id: Math.ceil(Math.random() * 100),
        title: this.newQuestionTitle,
        description : this.newQuestionDescription,
        authorId: userId,
        answers: []
      };


      this.questionService.createQuestion(question).subscribe((question) => {
        this.newQuestionTitle = '';
        this.newQuestionDescription = '';
        if (this.questions) {
          const mappedQuestion = this.questionService.mapQuestionResponseToModel(question);
          this.questions.push(mappedQuestion);
        }
      });
    });
  }









}
