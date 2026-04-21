export const MOCK_PRODUCTS = [
  { id: 1, sku: 'WM-001', name: 'Wireless Mouse', category: 'Accessories', currentStock: 3, reorderPoint: 10, costPrice: 12.5, sellingPrice: 24.99, status: 'Critical', location: 'Aisle A1', supplierName: 'North Tech Supply', updatedAt: '2026-04-19', history: [{ date: '2026-04-21', type: 'Sale', quantity: -2, balance: 3 }, { date: '2026-04-18', type: 'Restock', quantity: 10, balance: 5 }] },
  { id: 2, sku: 'USB-003', name: 'USB-C Cable', category: 'Accessories', currentStock: 8, reorderPoint: 15, costPrice: 4.1, sellingPrice: 12.99, status: 'Low Stock', location: 'Aisle A1', supplierName: 'CableCore Inc.', updatedAt: '2026-04-18', history: [{ date: '2026-04-20', type: 'Sale', quantity: -5, balance: 8 }] },
  { id: 3, sku: 'KB-015', name: 'Mechanical Keyboard', category: 'Peripherals', currentStock: 21, reorderPoint: 8, costPrice: 42, sellingPrice: 84.99, status: 'In Stock', location: 'Aisle B2', supplierName: 'North Tech Supply', updatedAt: '2026-04-16', history: [{ date: '2026-04-16', type: 'Restock', quantity: 15, balance: 21 }] },
  { id: 4, sku: 'HD-020', name: 'External SSD 1TB', category: 'Storage', currentStock: 12, reorderPoint: 5, costPrice: 74, sellingPrice: 129.99, status: 'In Stock', location: 'Aisle C3', supplierName: 'DataDrive Global', updatedAt: '2026-04-12', history: [{ date: '2026-04-17', type: 'Sale', quantity: -2, balance: 12 }] },
  { id: 5, sku: 'HS-210', name: 'Gaming Headset', category: 'Audio', currentStock: 0, reorderPoint: 6, costPrice: 28, sellingPrice: 59.99, status: 'Out of Stock', location: 'Aisle B1', supplierName: 'SoundHub Wholesale', updatedAt: '2026-04-11', history: [{ date: '2026-04-11', type: 'Sale', quantity: -4, balance: 0 }] },
  { id: 6, sku: 'LT-901', name: 'Laptop Stand', category: 'Office', currentStock: 34, reorderPoint: 12, costPrice: 16, sellingPrice: 34.99, status: 'In Stock', location: 'Aisle D2', supplierName: 'Workspace Pro', updatedAt: '2026-04-20', history: [{ date: '2026-04-20', type: 'Restock', quantity: 20, balance: 34 }] },
  { id: 7, sku: 'WC-777', name: 'Webcam 1080p', category: 'Video', currentStock: 9, reorderPoint: 10, costPrice: 22, sellingPrice: 49.99, status: 'Low Stock', location: 'Aisle C1', supplierName: 'VisionWare', updatedAt: '2026-04-17', history: [{ date: '2026-04-17', type: 'Sale', quantity: -3, balance: 9 }] },
  { id: 8, sku: 'PO-330', name: 'Portable Monitor', category: 'Displays', currentStock: 5, reorderPoint: 4, costPrice: 98, sellingPrice: 179.99, status: 'In Stock', location: 'Aisle D3', supplierName: 'ScreenSource', updatedAt: '2026-04-15', history: [{ date: '2026-04-15', type: 'Restock', quantity: 5, balance: 5 }] }
];

export const MOCK_SHIPMENTS = [
  {
    shipmentId: 'SHIP-24021',
    supplierName: 'North Tech Supply',
    expectedDate: '2026-04-24',
    status: 'In Transit',
    totalItems: 120,
    priority: 'High',
    items: [
      { sku: 'WM-001', name: 'Wireless Mouse', quantity: 50 },
      { sku: 'KB-015', name: 'Mechanical Keyboard', quantity: 30 },
      { sku: 'WC-777', name: 'Webcam 1080p', quantity: 40 }
    ]
  },
  {
    shipmentId: 'SHIP-24022',
    supplierName: 'DataDrive Global',
    expectedDate: '2026-04-26',
    status: 'Preparing',
    totalItems: 24,
    priority: 'Medium',
    items: [
      { sku: 'HD-020', name: 'External SSD 1TB', quantity: 24 }
    ]
  },
  {
    shipmentId: 'SHIP-24023',
    supplierName: 'Workspace Pro',
    expectedDate: '2026-04-29',
    status: 'Delayed',
    totalItems: 60,
    priority: 'High',
    items: [
      { sku: 'LT-901', name: 'Laptop Stand', quantity: 60 }
    ]
  }
];

export const MOCK_ACTIVITIES = [
  { id: 1, action: 'Stock Added', itemName: 'Wireless Mouse', quantity: 50, performedBy: 'John Doe', timestamp: '2026-04-21T16:26:45', type: 'ADD_STOCK' },
  { id: 2, action: 'Inventory Adjusted', itemName: 'USB-C Cable', quantity: -3, performedBy: 'Admin', timestamp: '2026-04-21T12:12:00', type: 'ADJUSTMENT' },
  { id: 3, action: 'Purchase Order Created', itemName: 'Portable Monitor', quantity: 20, performedBy: 'Admin', timestamp: '2026-04-20T10:35:00', type: 'ORDER' }
];

export const MOCK_SUPPLIERS = [
  { id: 1, name: 'North Tech Supply' },
  { id: 2, name: 'CableCore Inc.' },
  { id: 3, name: 'DataDrive Global' },
  { id: 4, name: 'Workspace Pro' }
];
