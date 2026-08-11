export interface Product {
  id: string;
  name: string;
  colors: string[];
  priceDiscount: number;
  priceOriginal: number;
  stock: number;
  description: string;
  longDescription?: string;
  mainImage: string;
  detailImages: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}
