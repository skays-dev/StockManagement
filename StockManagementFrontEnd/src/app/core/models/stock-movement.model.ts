export interface StockMovement {
  id: number;
  productId: number;
  productName?: string;
  type: string;
  quantity: number;
  note?: string;
  createdAt: string;
}

export interface StockMovementPayload {
  productId: number;
  type: string;
  quantity: number;
  note?: string;
}
