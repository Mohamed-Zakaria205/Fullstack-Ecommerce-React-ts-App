export interface IProduct {
  documentId: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  thumbnail: {
    url?: string;
  };
  category?: string;
  quantity?: number;
}

export interface IUser {
  documentId: string;
  name: string;
  email: string;
}
