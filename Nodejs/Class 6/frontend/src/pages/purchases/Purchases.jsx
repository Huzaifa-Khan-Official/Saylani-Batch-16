import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import DataTable from '../../components/tables/DataTable';
import { FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';

const Purchases = () => {
  const { purchases, currentUser } = useInventory();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Filtering
  const filteredPurchases = purchases.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(search.toLowerCase()) ||
                          p.productName.toLowerCase().includes(search.toLowerCase()) ||
                          p.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter === '' || p.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const columns = [
    {
      header: 'Receipt ID',
      key: 'id',
      render: (row) => <span className="font-semibold text-indigo-600">{row.id}</span>
    },
    {
      header: 'Supply Date',
      key: 'date',
    },
    {
      header: 'Product Name',
      key: 'productName',
      render: (row) => <span className="font-semibold text-slate-800">{row.productName}</span>
    },
    {
      header: 'Supplier Vendor',
      key: 'supplier',
    },
    {
      header: 'Quantity',
      key: 'quantity',
      render: (row) => <span>{row.quantity} units</span>
    },
    {
      header: 'Unit Cost',
      key: 'price',
      render: (row) => <span>${Number(row.price).toFixed(2)}</span>
    },
    {
      header: 'Total Invoice',
      key: 'total',
      render: (row) => <span className="font-bold text-slate-800">${Number(row.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Supply Purchases</h1>
          <p className="text-xs text-slate-500">Track and catalogue vendor inbound supply stock invoices and logistics receipts</p>
        </div>
        {currentUser?.role !== 'Sales Person' && (
          <button
            onClick={() => navigate('/purchases/create')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiPlus className="mr-1.5 w-4.5 h-4.5" />
            Create Purchase
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by ID, Product, Supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-800 rounded-lg bg-white placeholder-slate-400"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiCalendar className="w-4 h-4" />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-700 rounded-lg bg-white appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredPurchases}
        emptyTitle="No purchases found"
        emptyDesc="No supply invoice receipts match the criteria."
        actionText="Create Purchase"
        onAction={() => navigate('/purchases/create')}
      />
    </div>
  );
};

export default Purchases;
