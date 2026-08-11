export interface QuestionBank {
  id: string;

  title: string;

  subjectId: string;

  chapterId: string;

  storagePath: string;

  totalQuestion: number;

  duration: number;

  difficulty:
    | "mudah"
    | "sedang"
    | "sulit";

  order: number;
}