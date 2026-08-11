export interface Subject {
  id: string;
  name: string;
  icon?: string;
  order: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  order: number;
}

export interface Material {
  id: string;
  chapterId: string;
  title: string;
  description?: string;
  duration?: number;
}

export interface MaterialProgress {
  chapterId: string;

  completed: boolean;

  progress: number;

  updatedAt?: string;
}