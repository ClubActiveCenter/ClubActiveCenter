export enum ProductState {
  Disponible = "disponible",
  SinStock = "sin stock",
  Retirado = "retirado",
}

export interface IProducts {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  State: ProductState;
  quantity: number;
}
