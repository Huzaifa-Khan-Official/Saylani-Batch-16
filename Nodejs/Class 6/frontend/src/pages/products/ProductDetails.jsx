import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import Badge from '../../components/ui/Badge';
import { FiArrowLeft, FiEdit, FiAlertTriangle, FiTruck, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, suppliers, purchases, sales, currentUser } = useInventory();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
        <FiAlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The product might have been deleted or the URL is invalid.</p>
        <Link to="/products" className="mt-4 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          <FiArrowLeft className="mr-1.5 w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  // Find Supplier details
  const supplierInfo = suppliers.find(s => s.name === product.supplier) || {
    name: product.supplier,
    email: 'N/A',
    contact: 'N/A',
    address: 'N/A'
  };

  // Filter Purchase history
  const productPurchases = purchases.filter(p => p.productId === product.id);

  // Filter Sales history
  const productSales = sales.filter(s => s.productId === product.id);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            to="/products"
            className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{product.name}</h1>
            <p className="text-xs text-slate-500 font-mono">SKU: {product.sku}</p>
          </div>
        </div>
        {currentUser?.role !== 'Sales Person' && (
          <Link
            to={`/products/edit/${product.id}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiEdit className="mr-1.5 w-4 h-4" />
            Edit Product
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Product Specifications & Supplier Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Main info card */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&auto=format&fit=crop&q=80'}
              alt={product.name}
              className="w-full h-48 object-cover border-b border-slate-150"
            />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-lg">
                  {product.category}
                </span>
                <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Description</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {product.description || 'No description provided for this product catalogue entry.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase">Unit Price</h4>
                  <p className="text-lg font-bold text-slate-800 mt-0.5">${Number(product.price).toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase">Stock Count</h4>
                  <p className={`text-lg font-bold mt-0.5 ${product.stock < 10 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {product.stock} units
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <FiTruck className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800">Supplier Specifications</h3>
            </div>
            
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Supplier Name</p>
                <p className="font-semibold text-slate-800 mt-0.5">{supplierInfo.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Email Address</p>
                <p className="text-slate-700 mt-0.5">{supplierInfo.email}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Contact number</p>
                <p className="text-slate-700 mt-0.5">{supplierInfo.contact || supplierInfo.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Business Address</p>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{supplierInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Transaction Ledger History Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchase History */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-600 mb-4">
              <FiShoppingBag className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800">Supply Purchase History</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 text-slate-400">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Qty</th>
                    <th className="pb-3">Unit Cost</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {productPurchases.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-indigo-600">{p.id}</td>
                      <td className="py-3">{p.date}</td>
                      <td className="py-3">{p.quantity} units</td>
                      <td className="py-3">${p.price}</td>
                      <td className="py-3 text-right font-semibold text-slate-800">${p.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  {productPurchases.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-400">No supply purchase history found for this product.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales History */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-600 mb-4">
              <FiTrendingUp className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800">Sales History Ledger</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 text-slate-400">Invoice ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Qty</th>
                    <th className="pb-3">Selling Price</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {productSales.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-indigo-600">{s.id}</td>
                      <td className="py-3">{s.date}</td>
                      <td className="py-3">{s.quantity} units</td>
                      <td className="py-3">${s.price}</td>
                      <td className="py-3 text-right font-semibold text-slate-800">${s.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  {productSales.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-400">No customer sales transactions recorded for this product.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
