export const initialUsers = [
  {
    id: 'u1',
    name: 'Alice Admin',
    email: 'admin@ims.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u2',
    name: 'Bob Manager',
    email: 'manager@ims.com',
    role: 'Inventory Manager',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u3',
    name: 'Charlie Sales',
    email: 'sales@ims.com',
    role: 'Sales Person',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u4',
    name: 'David Staff',
    email: 'david@ims.com',
    role: 'Sales Person',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialCategories = [
  { id: 'cat1', name: 'Electronics', description: 'Smartphones, gadgets, and general audio devices' },
  { id: 'cat2', name: 'Computers', description: 'Desktop PCs, laptops, and compute screens' },
  { id: 'cat3', name: 'Accessories', description: 'Input peripherals, mouse, keyboards, and cables' },
  { id: 'cat4', name: 'Furniture', description: 'Ergonomic chairs, standing desks, and office equipment' }
];

export const initialSuppliers = [
  {
    id: 'sup1',
    name: 'Apple Distribution Inc.',
    email: 'supply@apple.com',
    phone: '1-800-MY-APPLE',
    address: 'One Apple Park Way, Cupertino, CA 95014'
  },
  {
    id: 'sup2',
    name: 'Dell USA L.P.',
    email: 'sales@dell.com',
    phone: '1-800-456-3355',
    address: 'One Dell Way, Round Rock, TX 78682'
  },
  {
    id: 'sup3',
    name: 'Logitech Corp',
    email: 'b2b@logitech.com',
    phone: '1-510-795-8500',
    address: '7700 Gateway Blvd, Newark, CA 94560'
  },
  {
    id: 'sup4',
    name: 'Sony North America',
    email: 'b2b.support@sony.com',
    phone: '1-800-222-7669',
    address: '115 West 57th Street, New York, NY 10019'
  },
  {
    id: 'sup5',
    name: 'OfficeDepot Corp',
    email: 'info@officedepot.com',
    phone: '1-800-463-3768',
    address: '6600 North Military Trail, Boca Raton, FL 33496'
  }
];

export const initialProducts = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro',
    description: 'Apple flagship smartphone 256GB Space Gray with Titanium design.',
    sku: 'IPH15P-256-SG',
    price: 999,
    stock: 24,
    category: 'Electronics',
    supplier: 'Apple Distribution Inc.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&auto=format&fit=crop&q=60',
    status: 'In Stock'
  },
  {
    id: 'p2',
    name: 'Dell XPS 13 Laptop',
    description: 'Dell flagship laptop Intel Core i7, 16GB RAM, 512GB NVMe SSD.',
    sku: 'DELL-XPS13-I7',
    price: 1299,
    stock: 8,
    category: 'Computers',
    supplier: 'Dell USA L.P.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&auto=format&fit=crop&q=60',
    status: 'Low Stock'
  },
  {
    id: 'p3',
    name: 'Logitech MX Master 3S',
    description: 'Wireless performance mouse featuring 8K DPI tracking and quiet clicks.',
    sku: 'LOGI-MX3S-M',
    price: 99,
    stock: 45,
    category: 'Accessories',
    supplier: 'Logitech Corp',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop&q=60',
    status: 'In Stock'
  },
  {
    id: 'p4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium industry-leading wireless noise-canceling headphones.',
    sku: 'SONY-WH1000XM5',
    price: 399,
    stock: 6,
    category: 'Electronics',
    supplier: 'Sony North America',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60',
    status: 'Low Stock'
  },
  {
    id: 'p5',
    name: 'Ergonomic Office Chair',
    description: 'High-back mesh desk chair with lumbar support and adjustable arms.',
    sku: 'OFF-CHR-ERG-01',
    price: 249,
    stock: 12,
    category: 'Furniture',
    supplier: 'OfficeDepot Corp',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=200&auto=format&fit=crop&q=60',
    status: 'In Stock'
  },
  {
    id: 'p6',
    name: 'Keychron K2 Keyboard',
    description: 'Wireless mechanical keyboard with tactile brown switches and RGB layout.',
    sku: 'KEY-K2-RGB',
    price: 89,
    stock: 4,
    category: 'Accessories',
    supplier: 'Logitech Corp',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=60',
    status: 'Low Stock'
  }
];

export const initialPurchases = [
  {
    id: 'PUR-001',
    date: '2026-06-01',
    productId: 'p1',
    productName: 'iPhone 15 Pro',
    supplier: 'Apple Distribution Inc.',
    quantity: 10,
    price: 850,
    total: 8500
  },
  {
    id: 'PUR-002',
    date: '2026-06-03',
    productId: 'p2',
    productName: 'Dell XPS 13 Laptop',
    supplier: 'Dell USA L.P.',
    quantity: 5,
    price: 1100,
    total: 5500
  },
  {
    id: 'PUR-003',
    date: '2026-06-05',
    productId: 'p3',
    productName: 'Logitech MX Master 3S',
    supplier: 'Logitech Corp',
    quantity: 20,
    price: 70,
    total: 1400
  },
  {
    id: 'PUR-004',
    date: '2026-06-10',
    productId: 'p4',
    productName: 'Sony WH-1000XM5 Headphones',
    supplier: 'Sony North America',
    quantity: 8,
    price: 320,
    total: 2560
  }
];

export const initialSales = [
  {
    id: 'SAL-001',
    date: '2026-06-02',
    productId: 'p1',
    productName: 'iPhone 15 Pro',
    quantity: 2,
    price: 999,
    total: 1998
  },
  {
    id: 'SAL-002',
    date: '2026-06-04',
    productId: 'p3',
    productName: 'Logitech MX Master 3S',
    quantity: 5,
    price: 99,
    total: 495
  },
  {
    id: 'SAL-003',
    date: '2026-06-08',
    productId: 'p5',
    productName: 'Ergonomic Office Chair',
    quantity: 1,
    price: 249,
    total: 249
  },
  {
    id: 'SAL-004',
    date: '2026-06-11',
    productId: 'p1',
    productName: 'iPhone 15 Pro',
    quantity: 1,
    price: 999,
    total: 999
  }
];

export const chartSalesData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 5900 },
  { month: 'Mar', amount: 8000 },
  { month: 'Apr', amount: 7200 },
  { month: 'May', amount: 9500 },
  { month: 'Jun', amount: 12500 }
];

export const chartPurchasesData = [
  { month: 'Jan', amount: 6500 },
  { month: 'Feb', amount: 4500 },
  { month: 'Mar', amount: 9000 },
  { month: 'Apr', amount: 5000 },
  { month: 'May', amount: 11000 },
  { month: 'Jun', amount: 17960 }
];
