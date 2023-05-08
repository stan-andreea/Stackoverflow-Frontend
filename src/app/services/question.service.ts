import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Answer} from "../model/answer.model";
import {Question} from "../model/question.model";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly url = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url).pipe(
      map((questions: any[]) => {
        return questions.map((q: any) => {
          return {
            id: q.id,
            title: q.title,
            description: q.description,
            answers: q.answers.map((a: any) => {
              return {
                id: a.id,
                text: a.text,
                authorId: a.authorId
              } as Answer;
            }),
            tags: q.tags,
            authorId: q.authorId
          } as Question;
        });
      })
    );
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>('${this.url}/${id}');
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${userId}`);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.url, question);
  }

  mapQuestionResponseToModel(question: any): any {
    return {
      id: question.id,
      title: question.title,
      description: question.description,
      answers: question.answers.map((a: any) => {
        return {
          id: a.id,
          text: a.text,
          authorId: a.authorId
        };
      }),
      tags: question.tags,
      authorId: question.authorId
    };
  }

  getAuthor(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }
  getAuthorByQuestion(question: Question): Observable<User> {
    return this.http.get<any>(`http://localhost:3000/users/${question.authorId}`).pipe(
      map(user => {
        return {
          id: user.id,
          username: user.username
        } as User;
      })
    );
  }

  updateQuestion(questionId: number | undefined, updatedQuestion: Question | any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/questions/${questionId}`, updatedQuestion);
  }

}
