export interface CreateUserDTO {
  name: string;
  email: string;
}

export interface CreatePageDTO {
  title: string;
  content?: string;
  userId: number;
}