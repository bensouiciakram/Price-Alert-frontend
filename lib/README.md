# API Services and React Query Hooks

This directory contains a well-structured axios-based HTTP service layer with React Query v5 custom hooks for consuming Django REST API endpoints.

## 📁 Structure

```
lib/
├── http/                    # HTTP layer
│   ├── client.ts           # Axios instance configuration
│   ├── types.ts            # TypeScript type definitions
│   ├── websites.ts         # Website endpoint consumers
│   ├── products.ts         # Product endpoint consumers
│   ├── priceHistory.ts    # Price history endpoint consumers
│   ├── xpaths.ts          # Xpath endpoint consumers
│   ├── channels.ts        # Channel endpoint consumers
│   ├── alerts.ts          # Alert endpoint consumers
│   ├── demoTokens.ts      # Demo token endpoint consumers
│   └── index.ts           # HTTP exports
├── hooks/                  # React Query hooks layer
│   ├── useWebsites.ts     # Website hooks
│   ├── useProducts.ts     # Product hooks
│   ├── usePriceHistory.ts # Price history hooks
│   ├── useXpaths.ts       # Xpath hooks
│   ├── useChannels.ts     # Channel hooks
│   ├── useAlerts.ts       # Alert hooks
│   ├── useDemoTokens.ts   # Demo token hooks
│   ├── QueryProvider.tsx  # React Query provider
│   └── index.ts           # Hooks exports
└── index.ts               # Main exports
```

## 🚀 Setup

1. **Install Dependencies:**
   ```bash
   npm install @tanstack/react-query @tanstack/react-query-devtools axios
   ```

2. **Set Environment Variable:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Wrap Your App:**
   ```tsx
   import { QueryProvider } from './lib';
   
   export default function RootLayout({ children }) {
     return (
       <QueryProvider>
         {children}
       </QueryProvider>
     );
   }
   ```

## 📖 Usage Examples

### Importing Services and Hooks

```tsx
// Import everything from main lib
import { useProducts, useCreateProduct, ProductFormData } from './lib';

// Or import from specific modules
import { useProducts } from './lib/hooks';
import { productService } from './lib/http';
```

### Using Product Hooks

```tsx
import { useProducts, useCreateProduct, useDeleteProduct } from './lib';

function ProductsList() {
  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      await createProduct.mutateAsync(productData);
      // Product created successfully
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct.mutateAsync(id);
      // Product deleted successfully
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.meta?.title}</h3>
          <p>{product.url}</p>
          <button onClick={() => handleDeleteProduct(product.id!)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Using Alert Hooks

```tsx
import { useAlerts, useCreateAlert } from './lib';

function AlertsList() {
  const { data: alerts, isLoading } = useAlerts();
  const createAlert = useCreateAlert();

  const handleCreateAlert = async (alertData: AlertFormData) => {
    try {
      await createAlert.mutateAsync(alertData);
      // Alert created successfully
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  };

  return (
    <div>
      {alerts?.map(alert => (
        <div key={alert.id}>
          <h3>{alert.product.meta?.title}</h3>
          <p>Threshold: ${alert.threshold}</p>
          <p>Frequency: {alert.frequency} minutes</p>
        </div>
      ))}
    </div>
  );
}
```

### Adding Products with Scraping

```tsx
import { useAddProduct } from './lib';

function AddProductForm() {
  const addProduct = useAddProduct();

  const handleSubmit = async (formData: AddProductRequest) => {
    try {
      const result = await addProduct.mutateAsync(formData);
      console.log('Product added:', result.message);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit({
        product_url: formData.get('url') as string,
        channel: formData.get('channel') as string,
        threshold: Number(formData.get('threshold')),
        frequency: Number(formData.get('frequency')),
      });
    }}>
      {/* Form fields */}
    </form>
  );
}
```

### Adding New Scrapers

```tsx
import { useAddScraper } from './lib';

function AddScraperForm() {
  const addScraper = useAddScraper();

  const handleSubmit = async (formData: AddScraperRequest) => {
    try {
      const result = await addScraper.mutateAsync(formData);
      ('Scraper added:', result.message);
    } catch (error) {
      console.error('Failed to add scraper:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit({
        url: formData.get('url') as string,
        scraping_method: formData.get('scraping_method') as string,
        price_selector: formData.get('price_selector') as string,
        image_selector: formData.get('image_selector') as string,
        title_selector: formData.get('title_selector') as string,
        price_cleanup: formData.get('price_cleanup') as string,
        title_cleanup: formData.get('title_cleanup') as string,
        image_cleanup: formData.get('image_cleanup') as string,
      });
    }}>
      {/* Form fields */}
    </form>
  );
}
```

## 🔧 Available Hooks

### Products (`useProducts.ts`)
- `useProducts()` - Get all products
- `useProduct(id)` - Get product by ID
- `useCreateProduct()` - Create new product
- `useUpdateProduct()` - Update product
- `useDeleteProduct()` - Delete product
- `useAddProduct()` - Add product with scraping

### Websites (`useWebsites.ts`)
- `useWebsites()` - Get all websites
- `useCreateWebsite()` - Create new website

### Price History (`usePriceHistory.ts`)
- `usePriceHistory()` - Get all price history
- `useCreatePriceHistory()` - Create new price history

### Xpaths (`useXpaths.ts`)
- `useXpaths()` - Get all xpaths
- `useCreateXpath()` - Create new xpath
- `useUpdateXpath()` - Update xpath
- `useAddScraper()` - Add new scraper

### Channels (`useChannels.ts`)
- `useChannels()` - Get all channels
- `useCreateChannel()` - Create new channel

### Alerts (`useAlerts.ts`)
- `useAlerts()` - Get all alerts
- `useCreateAlert()` - Create new alert

### Demo Tokens (`useDemoTokens.ts`)
- `useDemoToken(id)` - Get demo token by ID

## 🛠️ HTTP Services

### Direct Service Usage (if needed)

```tsx
import { productService, alertService } from './lib/http';

// Direct API calls without React Query
const products = await productService.getAll();
const newProduct = await productService.create(productData);
```

## 🎯 Key Features

- **🔐 Authentication**: Automatic token handling via interceptors
- **🛡️ Error Handling**: Global error interceptors with retry logic
- **🔄 Auto-retry**: Smart retry logic for failed requests
- **📱 SSR Ready**: Optimized for Next.js with proper hydration
- **🎯 Type Safe**: Full TypeScript support with proper interfaces
- **🧪 Dev Tools**: React Query DevTools integration
- **⚡ Performance**: Optimized caching and background refetching
- **🔧 Modular**: Clean separation between HTTP layer and hooks layer

## 📝 API Endpoints Covered

### Products (`/products/`)
- `GET /products/websites/` - List websites
- `POST /products/websites/` - Create website
- `GET /products/products/` - List products
- `POST /products/products/` - Create product
- `GET /products/products/{id}/` - Get product
- `PUT /products/products/{id}/` - Update product
- `DELETE /products/products/{id}/` - Delete product
- `GET /products/prices/` - List price history
- `POST /products/prices/` - Create price history
- `GET /products/xpaths/` - List xpaths
- `POST /products/xpaths/` - Create xpath
- `PUT /products/xpaths/{id}/` - Update xpath
- `POST /products/add-product/` - Add new product with scraping
- `POST /products/add-scraper/` - Add new scraper

### Alerts (`/alerts/`)
- `GET /alerts/channels/` - List channels
- `POST /alerts/channels/` - Create channel
- `GET /alerts/alerts/` - List alerts
- `POST /alerts/alerts/` - Create alert

### Core (`/core/`)
- `GET /core/tokens/{id}/` - Get demo token

## 🏗️ Architecture Benefits

1. **Separation of Concerns**: HTTP layer is separate from React Query hooks
2. **Reusability**: HTTP services can be used independently of React Query
3. **Maintainability**: Each endpoint has its own file for easy maintenance
4. **Type Safety**: Full TypeScript support throughout the stack
5. **Testability**: Easy to mock and test individual services
6. **Scalability**: Easy to add new endpoints and hooks
