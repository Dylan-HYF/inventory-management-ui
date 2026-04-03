import axios from 'axios';

const inventoryApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests (reusing authService pattern)
inventoryApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const inventoryAPI = {
    // Products
    getProducts: () => inventoryApi.get('/products'),
    addProduct: (productData) => inventoryApi.post('/products', productData),
    
    // Inventory
    receiveStock: (data) => inventoryApi.post('/inventory/receive', data),
    adjustInventory: (data) => inventoryApi.post('/inventory/adjust', data),
    
    // Orders
    getIncomingShipments: () => inventoryApi.get('/purchase-orders?status=SHIPPED'),
    getPendingOrders: () => inventoryApi.get('/sales-orders?status=PENDING'),
    createPurchaseOrder: (poData) => inventoryApi.post('/purchase-orders', poData),
    
    // Suppliers
    getSuppliers: () => inventoryApi.get('/suppliers'),
    
    // Activities
    getRecentActivities: (limit = 10) => inventoryApi.get(`/activities/recent?limit=${limit}`),
};

export default inventoryApi;