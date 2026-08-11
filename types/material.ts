export interface Material {
  id: string;

  title: string;

  description?: string;

  chapterId: string;

  storagePath: string;

  thumbnail?: string;

  duration?: number;

  isFree: boolean;

  order: number;

  createdAt?: Date;

  updatedAt?: Date;
}