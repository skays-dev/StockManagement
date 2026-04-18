export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  minimumStock: number;
  categoryId: number;
  categoryName?: string;
  isLowStock?: boolean;
}

export interface ProductPayload {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  minimumStock: number;
  categoryId: number;
}
