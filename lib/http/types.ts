// Types based on Django models
export interface Website {
  id?: number;
  url: string;
  scraping_method?: string;
}

export interface ProductMetaData {
  id?: number;
  title: string;
  image: string;
}

export interface Product {
  id?: number;
  url: string;
  created_at?: string;
  website: Website;
  meta?: ProductMetaData;
}

export interface PriceHistory {
  id?: number;
  price: string;
  checked_at: string;
  product: Product;
}

export interface Xpath {
  id?: number;
  website: number;
  price_selector?: string;
  image_selector?: string;
  title_selector?: string;
  price_cleanup?: string;
  title_cleanup?: string;
  image_cleanup?: string;
}

export interface Channel {
  id?: number;
  name: string;
}

export interface Alert {
  id?: number;
  threshold: string;
  frequency: number;
  created_at?: string;
  channel: Channel;
  product: Product;
}

export interface DemoToken {
  id?: number;
  token: string;
  expire_at: string;
  is_active: boolean;
  created_at?: string;
  user: number;
}

// Request/Response types
export interface AddProductRequest {
  product_url: string;
  channel: string;
  threshold: number;
  frequency: number;
}

export interface AddScraperRequest {
  url: string;
  scraping_method: string;
  price_selector: string;
  image_selector: string;
  title_selector: string;
  price_cleanup: string;
  title_cleanup: string;
  image_cleanup: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Additional utility types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Form types for better UX
export interface ProductFormData {
  url: string;
  website: number;
}

export interface AlertFormData {
  threshold: number;
  frequency: number;
  channel: number;
  product: number;
}

export interface ChannelFormData {
  name: string;
}

export interface WebsiteFormData {
  url: string;
  scraping_method: string;
}

export interface XpathFormData {
  website: number;
  price_selector: string;
  image_selector: string;
  title_selector: string;
  price_cleanup: string;
  title_cleanup: string;
  image_cleanup: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}
