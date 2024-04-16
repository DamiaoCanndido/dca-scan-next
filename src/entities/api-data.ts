export interface ApiData {
  id?: string;
  order?: number;
  description?: string;
  file?: string[];
  ownerId?: string;
  createdAt?: string;
  slug: string;
}

export interface TodoList {
  id?: string;
  description?: string;
  order?: string;
  createdAt?: string;
}
