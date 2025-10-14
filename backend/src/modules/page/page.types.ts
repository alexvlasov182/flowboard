export interface CreatePageDTO {
  title: string;
  content?: string;
  userId: number;
}

export interface UpdatePageDTO {
  title?: string;
  content?: string;
}