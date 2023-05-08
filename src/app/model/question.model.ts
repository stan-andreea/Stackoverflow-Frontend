import {Answer} from "./answer.model";

export interface Question {
  id: number;
  title: string;
  description: string;
  answers: Answer[];
  authorId: number;
  author?: string;
  tags: string;

}
