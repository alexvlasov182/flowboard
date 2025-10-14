export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreatePageDTO {
  title: string;
  content?: string;
  userId: number;
}

export interface UpdatePageDTO {
  title?: string;
  content?: string;
}