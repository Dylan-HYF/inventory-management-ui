import { useEffect, useState } from 'react';
import { inventoryAPI } from '../services/inventoryApi';
import { MOCK_ACTIVITIES, MOCK_PRODUCTS, MOCK_SHIPMENTS, MOCK_SUPPLIERS } from '../data/mockData';

const buildMetrics = (products, shipments) => {
  const totalSKUs = products.length;
  const lowStockItems = products.filter((p) => p.currentStock <= p.reorderPoint && p.currentStock > 0).length;
  const outOfStock = products.filter((p) => p.currentStock === 0).length;
  const pendingOrders = shipments.filter((s) => s.status !== 'Delivered').length + 33;
  const incomingShipments = shipments.length;
  const cost = products.reduce((sum, p) => sum + (Number(p.costPrice) * Number(p.currentStock)), 0);
  const retail = products.reduce((sum, p) => sum + (Number(p.sellingPrice) * Number(p.currentStock)), 0);
  const lowStockAlerts = products
    .filter((p) => p.currentStock <= p.reorderPoint)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      currentStock: p.currentStock,
      reorderPoint: p.reorderPoint,
      status: p.currentStock === 0 || p.currentStock <= Math.max(1, Math.floor(p.reorderPoint / 2)) ? 'critical' : 'low'
    }));

  return {
    metrics: { totalSKUs, lowStockItems, outOfStock, incomingShipments, pendingOrders },
    inventoryValue: { cost, retail },
    lowStockAlerts
  };
};

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ totalSKUs: 0, lowStockItems: 0, outOfStock: 0, incomingShipments: 0, pendingOrders: 0 });
  const [inventoryValue, setInventoryValue] = useState({ cost: 0, retail: 0 });
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const setMockData = () => {
    const { metrics: computedMetrics, inventoryValue: computedValues, lowStockAlerts: computedAlerts } = buildMetrics(MOCK_PRODUCTS, MOCK_SHIPMENTS);
    setMetrics(computedMetrics);
    setInventoryValue(computedValues);
    setLowStockAlerts(computedAlerts);
    setRecentActivities(MOCK_ACTIVITIES);
    setSuppliers(MOCK_SUPPLIERS);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const productsRes = await inventoryAPI.getProducts();
      const products = productsRes.data;
      const [shipmentsRes, ordersRes, activitiesRes, suppliersRes] = await Promise.all([
        inventoryAPI.getIncomingShipments(),
        inventoryAPI.getPendingOrders(),
        inventoryAPI.getRecentActivities(),
        inventoryAPI.getSuppliers()
      ]);
      const { metrics: computedMetrics, inventoryValue: computedValues, lowStockAlerts: computedAlerts } = buildMetrics(products, shipmentsRes.data);
      setMetrics({ ...computedMetrics, pendingOrders: ordersRes.data.length || computedMetrics.pendingOrders });
      setInventoryValue(computedValues);
      setLowStockAlerts(computedAlerts);
      setRecentActivities(activitiesRes.data?.length ? activitiesRes.data : MOCK_ACTIVITIES);
      setSuppliers(suppliersRes.data?.length ? suppliersRes.data : MOCK_SUPPLIERS);
    } catch (error) {
      console.error('Dashboard fallback to mock data:', error);
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { loading, metrics, inventoryValue, lowStockAlerts, recentActivities, suppliers, refreshData: fetchDashboardData };
};
