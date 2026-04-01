export interface IProduct {
  documentId: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  thumbnail: {
    url?: string;
  };
  category?: ICategory;
  quantity?: number;
}

export interface ICategory {
  documentId: string;
  title: string;
}

export interface IUser {
  documentId: string;
  name: string;
  email: string;
}
