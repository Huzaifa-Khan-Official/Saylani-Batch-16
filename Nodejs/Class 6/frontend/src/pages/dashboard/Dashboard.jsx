import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import StatisticCard from '../../components/ui/StatisticCard';
import { SalesLineChart, PurchasesBarChart } from '../../components/charts/DashboardCharts';
import { 
  FiPackage, FiLayers, FiTruck, FiArrowDownLeft, 
  FiArrowUpRight, FiAlertTriangle, FiPlus, FiTrendingUp 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/ui/Badge';

const Dashboard = () => {
  const { products, categories, suppliers, purchases, sales, currentUser } = useInventory();
  const navigate = useNavigate();

  // Dynamic calculations
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalSuppliers = suppliers.length;
  const totalPurchasesCost = purchases.reduce((acc, p) => acc + Number(p.total), 0);
  const totalSalesRevenue = sales.reduce((acc, s) => acc + Number(s.total), 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  const recentPurchases = purchases.slice(0, 5);
  const recentSales = sales.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Overview Dashboard</h1>
          <p className="text-xs text-slate-500">Welcome back, {currentUser?.name}. Here is what is happening today.</p>
        </div>
        <div className="flex space-x-2.5">
          <button
            onClick={() => navigate('/purchases/create')}
            className="inline-flex items-center px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <FiArrowDownLeft className="mr-1.5 w-4 h-4 text-violet-500" />
            Add Purchase
          </button>
          <button
            onClick={() => navigate('/sales/create')}
            className="inline-flex items-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiPlus className="mr-1.5 w-4 h-4" />
            New Sale Order
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatisticCard
          title="Total Products"
          value={totalProducts}
          icon={FiPackage}
          color="indigo"
        />
        <StatisticCard
          title="Total Categories"
          value={totalCategories}
          icon={FiLayers}
          color="blue"
        />
        <StatisticCard
          title="Total Suppliers"
          value={totalSuppliers}
          icon={FiTruck}
          color="violet"
        />
        <StatisticCard
          title="Total Purchases"
          value={`$${totalPurchasesCost.toLocaleString()}`}
          icon={FiArrowDownLeft}
          color="amber"
        />
        <StatisticCard
          title="Total Sales"
          value={`$${totalSalesRevenue.toLocaleString()}`}
          icon={FiArrowUpRight}
          color="emerald"
        />
        <StatisticCard
          title="Low Stock"
          value={lowStockCount}
          icon={FiAlertTriangle}
          color="rose"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesLineChart />
        <PurchasesBarChart />
      </div>

      {/* Recent Activity lists */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Purchases */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Recent Purchase Receipts</h3>
              <p className="text-xs text-slate-500">Latest inventory supply acquisitions</p>
            </div>
            <button
              onClick={() => navigate('/purchases')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 text-slate-400">Order ID</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPurchases.map((pur) => (
                  <tr key={pur.id} className="hover:bg-slate-50/30">
                    <td className="py-3 font-semibold text-indigo-600">{pur.id}</td>
                    <td className="py-3 font-medium text-slate-800">{pur.productName}</td>
                    <td className="py-3 text-slate-600">{pur.quantity} units</td>
                    <td className="py-3 text-right font-bold text-slate-800">${pur.total.toLocaleString()}</td>
                  </tr>
                ))}
                {recentPurchases.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-slate-400">No purchases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Recent Sales Orders</h3>
              <p className="text-xs text-slate-500">Latest customer outbound purchase orders</p>
            </div>
            <button
              onClick={() => navigate('/sales')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 text-slate-400">Order ID</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/30">
                    <td className="py-3 font-semibold text-indigo-600">{sale.id}</td>
                    <td className="py-3 font-medium text-slate-800">{sale.productName}</td>
                    <td className="py-3 text-slate-600">{sale.quantity} units</td>
                    <td className="py-3 text-right font-bold text-slate-800">${sale.total.toLocaleString()}</td>
                  </tr>
                ))}
                {recentSales.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-slate-400">No sales orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
