export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitCost: number;
  totalValue: number;
  lastUpdated: Date;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstock';
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference?: string; // Order ID, Transfer ID, etc.
  userId: string;
  userName: string;
  date: Date;
  notes?: string;
}

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'expiring_soon';
  currentStock: number;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface StockReport {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  overstockItems: number;
  topMovingProducts: Array<{
    productId: string;
    productName: string;
    movements: number;
    quantity: number;
  }>;
  stockValueByCategory: Array<{
    category: string;
    value: number;
    percentage: number;
  }>;
}
