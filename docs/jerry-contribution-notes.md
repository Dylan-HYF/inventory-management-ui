# Jerry Contribution Notes

## Branch

Work was done on this separate branch:

`jerry-stock-shipment-details`

This keeps the contribution isolated from shared branches like `master`, `sku-list-page`, or `api-integration` until the team reviews and merges it.

## What Was Added

### 1. Stock Details Page

Added routing and navigation for a stock details page at:

`/skus/:sku`

From the SKU list page, each SKU row now has a **Details** button. This opens a detailed view for that item.

The page displays:

- Product name and SKU
- Current stock
- Reorder point
- Unit price
- Category
- Storage location
- Supplier
- Last restocked date
- Transaction history

The page tries to load product details from the backend API. If the backend endpoint is not ready, it shows sample data so the UI can still be demonstrated.

### 2. Shipment Details Page

Added a shipment details page at:

`/shipments`

The dashboard's **Incoming Shipments** metric card now opens this page.

The page displays:

- Shipment or purchase order ID
- Shipment status
- Supplier
- Expected delivery date
- Tracking number
- Destination warehouse
- Total incoming items
- Product list with SKU, product name, and quantity

The page tries to load incoming shipments from the backend API. If the backend endpoint is not ready, it shows sample shipment data for demo purposes.

### 3. API Service Methods

Added new API service methods in `src/services/inventoryApi.js`:

- `getProductById(id)`
- `getProductBySku(sku)`
- `getShipmentById(id)`

No API base URL or database configuration was changed, because another teammate may already be working on API/database setup.

## Files Changed

- `src/App.js`
- `src/pages/Dashboard.jsx`
- `src/pages/SKUListPage.jsx`
- `src/pages/StockDetailsPage.jsx`
- `src/pages/ShipmentDetailsPage.jsx`
- `src/services/inventoryApi.js`
- `docs/jerry-contribution-notes.md`

## Presentation Explanation

My contribution focused on improving the inventory management UI by adding detail views for stock and incoming shipments.

Before this work, the SKU list showed a table of items, but users could not open a detailed view for a specific SKU. I added a Stock Details page and connected it to the SKU list through a Details button. This gives users more complete information about each inventory item, including stock level, supplier, location, and transaction history.

I also added a Shipment Details page that opens from the dashboard's Incoming Shipments metric. This page helps users understand what shipments are arriving, which supplier they are from, when they are expected, and which products are included.

I kept my work on a separate Git branch so it does not affect other teammates' work until it is reviewed and merged. I also avoided changing API configuration because that may already be assigned to another team member.

## How To Demo

1. Start the React app.
2. Open the dashboard.
3. Click **Total SKUs** to open the SKU list.
4. Click **Details** beside a SKU to open the stock details page.
5. Go back to the dashboard.
6. Click **Incoming Shipments** to open the shipment details page.

If the backend is not running, the pages still display sample data so the flow can be shown during the presentation.
