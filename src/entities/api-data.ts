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

export interface ContractList {
  id?: string;
  hired?: string;
  value?: string;
  type?: string;
  duration?: string;
  order?: string;
  ownerId?: string;
  startsIn?: string;
  createdAt?: string;
}
