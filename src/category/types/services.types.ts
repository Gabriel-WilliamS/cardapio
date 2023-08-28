export interface ICreateCategory {
  userId: string;
  name: string;
}

export interface IUpdateCategory {
  id: string;
  userId: string;
  name: string;
}

export interface IDeleteCategory {
  id: string;
  userId: string;
}
