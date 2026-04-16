import MetricCard from '../components/dashboard/MetricCard';
export const MOCK_STOCK_DETAILS = [
    {
        id: 'SKU-1001',
        name: 'Wireless Mechanical Keyboard',
        category: 'Peripherals',
        status: 'In Stock',
        currentStock: 45,
        minStockLevel: 10,
        unitPrice: 89.99,
        location: 'Aisle 4, Shelf B',
        supplier: 'TechLogistics Corp',
        lastRestocked: '2026-03-15',
        history: [
            { date: '2026-04-01', type: 'Sale', quantity: -2, balance: 45 },
            { date: '2026-03-15', type: 'Restock', quantity: 20, balance: 47 },
            { date: '2026-03-10', type: 'Adjustment', quantity: -3, balance: 27 },
        ]
    },
    {
        id: 'SKU-2024',
        name: 'Ultrawide Monitor 34"',
        category: 'Displays',
        status: 'Low Stock',
        currentStock: 3,
        minStockLevel: 5,
        unitPrice: 450.00,
        location: 'Warehouse A',
        supplier: 'Visionary Screens',
        lastRestocked: '2026-02-10',
        history: [
            { date: '2026-04-10', type: 'Sale', quantity: -1, balance: 3 },
        ]
    }
];
const StockDetailsPage = () => {
    const stock = MOCK_STOCK_DETAILS[0];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Stock Details: {stock.name}</h2>
            <hr />

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <MetricCard title="Current Inventory" value={stock.currentStock} />
                <MetricCard title="Unit Price" value={`$${stock.unitPrice}`} />
                <MetricCard title="Status" value={stock.status} />
            </div>

            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
                <h3>General Information</h3>
                <p><strong>SKU:</strong> {stock.id}</p>
                <p><strong>Category:</strong> {stock.category}</p>
                <p><strong>Location:</strong> {stock.location}</p>
                <p><strong>Supplier:</strong> {stock.supplier}</p>
            </div>

            <h3 style={{ marginTop: '20px' }}>Transaction History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Change</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.history.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.type}</td>
                            <td>{entry.quantity}</td>
                            <td>{entry.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockDetailsPage;