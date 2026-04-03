import { useState, useEffect } from 'react';
import { inventoryAPI } from '../services/inventoryApi';

export const useDashboardData = () => {
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({
        totalSKUs: 0,
        lowStockItems: 0,
        outOfStock: 0,
        incomingShipments: 0,
        pendingOrders: 0
    });
    const [inventoryValue, setInventoryValue] = useState({ cost: 0, retail: 0 });
    const [lowStockAlerts, setLowStockAlerts] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch products
            const productsRes = await inventoryAPI.getProducts();
            const products = productsRes.data;

            // Calculate metrics
            const totalSKUs = products.length;
            const lowStockItems = products.filter(p => p.currentStock <= p.reorderPoint && p.currentStock > 0).length;
            const outOfStock = products.filter(p => p.currentStock === 0).length;

            // Calculate inventory value
            const costValue = products.reduce((sum, p) => sum + (p.costPrice * p.currentStock), 0);
            const retailValue = products.reduce((sum, p) => sum + (p.sellingPrice * p.currentStock), 0);

            // Get low stock alerts
            const lowStock = products.filter(p => p.currentStock <= p.reorderPoint);
            const alerts = lowStock.map(p => ({
                id: p.id,
                name: p.name,
                sku: p.sku,
                currentStock: p.currentStock,
                reorderPoint: p.reorderPoint,
                status: p.currentStock === 0 ? 'critical' : 
                        (p.currentStock <= p.reorderPoint / 2 ? 'critical' : 'low')
            }));

            // Get incoming shipments and pending orders
            const [shipmentsRes, ordersRes, activitiesRes, suppliersRes] = await Promise.all([
                inventoryAPI.getIncomingShipments(),
                inventoryAPI.getPendingOrders(),
                inventoryAPI.getRecentActivities(),
                inventoryAPI.getSuppliers()
            ]);

            setMetrics({
                totalSKUs,
                lowStockItems,
                outOfStock,
                incomingShipments: shipmentsRes.data.length,
                pendingOrders: ordersRes.data.length
            });

            setInventoryValue({ cost: costValue, retail: retailValue });
            setLowStockAlerts(alerts);
            setRecentActivities(activitiesRes.data);
            setSuppliers(suppliersRes.data);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Set mock data for demo if API fails
            setMockData();
        } finally {
            setLoading(false);
        }
    };

    const setMockData = () => {
        setMetrics({
            totalSKUs: 1247,
            lowStockItems: 23,
            outOfStock: 8,
            incomingShipments: 12,
            pendingOrders: 45
        });
        setInventoryValue({ cost: 284750.50, retail: 498312.75 });
        setLowStockAlerts([
            { id: 1, name: 'Wireless Mouse', sku: 'WM-001', currentStock: 3, reorderPoint: 10, status: 'critical' },
            { id: 2, name: 'USB Cable', sku: 'USB-003', currentStock: 8, reorderPoint: 15, status: 'low' }
        ]);
        setRecentActivities([
            { id: 1, action: 'Stock Added', itemName: 'Wireless Mouse', quantity: 50, performedBy: 'John Doe', timestamp: new Date().toISOString(), type: 'ADD_STOCK' }
        ]);
        setSuppliers([{ id: 1, name: 'Supplier 1' }, { id: 2, name: 'Supplier 2' }]);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return {
        loading,
        metrics,
        inventoryValue,
        lowStockAlerts,
        recentActivities,
        suppliers,
        refreshData: fetchDashboardData
    };
};