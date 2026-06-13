import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { FiArrowLeft, FiAlertTriangle, FiMail, FiPhone, FiMapPin, FiPackage, FiShoppingBag } from 'react-icons/fi';

const SupplierDetails = () => {
  const { id } = useParams();
  const { suppliers, products, purchases } = useInventory();

  const supplier = suppliers.find(s => s.id === id);

  if (!supplier) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
        <FiAlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-800">Supplier Profile Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The supplier profile might have been deleted or the URL is invalid.</p>
        <Link to="/suppliers" className="mt-4 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          <FiArrowLeft className="mr-1.5 w-4 h-4" /> Back to Suppliers
        </Link>
      </div>
    );
  }

  // Filter products supplied
  const suppliedProducts = products.filter(p => p.supplier === supplier.name);

  // Filter purchase logs
  const supplierPurchases = purchases.filter(pur => pur.supplier === supplier.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Link 
          to="/suppliers"
          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{supplier.name}</h1>
          <p className="text-xs text-slate-500">Detailed supplier contact sheet and transaction logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Supplier Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Contact Dossier</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start">
                <FiMail className="w-4 h-4 text-indigo-500 mr-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 font-medium">Email Address</p>
                  <a href={`mailto:${supplier.email}`} className="font-semibold text-slate-700 hover:text-indigo-600 mt-0.5 block">
                    {supplier.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <FiPhone className="w-4 h-4 text-indigo-500 mr-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 font-medium">Phone Number</p>
                  <a href={`tel:${supplier.phone}`} className="font-semibold text-slate-700 hover:text-indigo-600 mt-0.5 block">
                    {supplier.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <FiMapPin className="w-4 h-4 text-indigo-500 mr-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 font-medium">Business Address</p>
                  <p className="font-medium text-slate-600 mt-0.5 leading-relaxed">
                    {supplier.address || 'No location address registered.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Supplied items & Purchase invoices logs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supplied Products */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-600 mb-4">
              <FiPackage className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800">Products Supplied ({suppliedProducts.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 text-slate-400">SKU</th>
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3 text-right">Unit Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {suppliedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-800">{p.sku}</td>
                      <td className="py-3">
                        <Link to={`/products/${p.id}`} className="font-semibold text-indigo-600 hover:text-indigo-700">
                          {p.name}
                        </Link>
                      </td>
                      <td className="py-3">{p.category}</td>
                      <td className="py-3">{p.stock} units</td>
                      <td className="py-3 text-right font-semibold text-slate-800">${p.price}</td>
                    </tr>
                  ))}
                  {suppliedProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-400">No products catalogued to this vendor.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supply Purchase Invoices */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-600 mb-4">
              <FiShoppingBag className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800">Purchase Receipts Log</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 text-slate-400">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3 text-right">Total Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {supplierPurchases.map((pur) => (
                    <tr key={pur.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-indigo-600">{pur.id}</td>
                      <td className="py-3">{pur.date}</td>
                      <td className="py-3 font-medium text-slate-800">{pur.productName}</td>
                      <td className="py-3">{pur.quantity} units</td>
                      <td className="py-3 text-right font-bold text-slate-800">${pur.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  {supplierPurchases.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-400">No supply purchase receipts issued to this vendor.</td>
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

export default SupplierDetails;
