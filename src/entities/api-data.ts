export interface ApiData {
  data: {
    id: string;
    order: number;
    description: string;
    file: string[];
    ownerId: string;
    createdAt: string;
  }[];
}
