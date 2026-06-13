import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useNavigate, Link } from 'react-router-dom';
import StatisticCard from '../../components/ui/StatisticCard';
import Badge from '../../components/ui/Badge';
import { FiAlertTriangle, FiCheckCircle, FiInbox, FiTrendingDown, FiArrowDownLeft } from 'react-icons/fi';

const InventoryOverview = () => {
  const { products } = useInventory();
  const navigate = useNavigate();

  // Metrics
  const totalStockQuantity = products.reduce((acc, p) => acc + p.stock, 0);
  const outOfStockItems = products.filter(p => p.stock === 0);
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 10);
  const healthyStockItems = products.filter(p => p.stock >= 10);

  const getStatusVariant = (stock) => {
    if (stock === 0) return 'danger';
    if (stock < 10) return 'warning';
    return 'success';
  };

  const getStatusLabel = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'Healthy';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inventory Stock Overview</h1>
        <p className="text-xs text-slate-500">Monitor overall physical stock volumes, warning alerts, and restock needs</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Stock Units"
          value={totalStockQuantity}
          icon={FiInbox}
          color="indigo"
        />
        <StatisticCard
          title="Healthy SKUs (Stock >= 10)"
          value={healthyStockItems.length}
          icon={FiCheckCircle}
          color="emerald"
        />
        <StatisticCard
          title="Low Stock SKUs (< 10)"
          value={lowStockItems.length}
          icon={FiTrendingDown}
          color="amber"
        />
        <StatisticCard
          title="Out of Stock SKUs"
          value={outOfStockItems.length}
          icon={FiAlertTriangle}
          color="rose"
        />
      </div>

      {/* Critical Stock Alerts Section */}
      <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-rose-600 mb-6">
          <FiAlertTriangle className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-800">Critical Restock Alerts (Stock &lt; 10)</h2>
        </div>

        {/* List of critical items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...outOfStockItems, ...lowStockItems].map((p) => {
            const stockPct = Math.min(100, (p.stock / 10) * 100);
            const isCritical = p.stock === 0;

            return (
              <div 
                key={p.id}
                className={`border rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-md ${
                  isCritical 
                    ? 'border-rose-150 bg-rose-50/10' 
                    : 'border-amber-150 bg-amber-50/10'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        <Link to={`/products/${p.id}`} className="hover:underline hover:text-indigo-600">
                          {p.name}
                        </Link>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">SKU: {p.sku}</p>
                    </div>
                    <Badge variant={getStatusVariant(p.stock)}>{getStatusLabel(p.stock)}</Badge>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-1">
                      <span>Stock level progress</span>
                      <span>{p.stock} / 10 units</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCritical ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${stockPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Supplier: {p.supplier}</span>
                  <button
                    onClick={() => navigate('/purchases/create')}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-xs transition-all active:scale-95 ${
                      isCritical
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    <FiArrowDownLeft className="mr-1 w-3 h-3" />
                    Restock Order
                  </button>
                </div>
              </div>
            );
          })}

          {outOfStockItems.length === 0 && lowStockItems.length === 0 && (
            <div className="col-span-2 py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FiCheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-800">All Stock levels are healthy</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">There are no products with stock levels below 10 units.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryOverview;
