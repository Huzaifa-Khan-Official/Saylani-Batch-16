import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import DataTable from '../../components/tables/DataTable';
import Badge from '../../components/ui/Badge';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

const ProductList = () => {
  const { products, categories, suppliers, deleteProduct, currentUser } = useInventory();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Delete handler
  const handleDelete = (id, name) => {
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can delete products.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '' || p.category === selectedCategory;
    const matchesSupplier = selectedSupplier === '' || p.supplier === selectedSupplier;
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'default';
    }
  };

  const columns = [
    {
      header: 'Image',
      key: 'image',
      render: (row) => (
        <img 
          src={row.image || 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=100&auto=format&fit=crop&q=60'} 
          alt={row.name} 
          className="w-10 h-10 rounded-lg object-cover border border-slate-100 bg-slate-50"
        />
      )
    },
    {
      header: 'Product Name',
      key: 'name',
      render: (row) => (
        <div>
          <Link to={`/products/${row.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
            {row.name}
          </Link>
          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{row.sku}</span>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
    },
    {
      header: 'Supplier',
      key: 'supplier',
      render: (row) => (
        <span className="text-xs text-slate-500 max-w-[150px] block truncate">{row.supplier}</span>
      )
    },
    {
      header: 'Price',
      key: 'price',
      render: (row) => <span className="font-semibold text-slate-800">${Number(row.price).toFixed(2)}</span>
    },
    {
      header: 'Stock',
      key: 'stock',
      render: (row) => (
        <span className={`font-semibold ${row.stock < 10 ? 'text-rose-600' : 'text-slate-700'}`}>
          {row.stock} units
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/products/${row.id}`}
            title="View Details"
            className="p-1.5 bg-slate-50 text-slate-500 hover:text-indigo-600 border border-slate-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <FiEye className="w-4 h-4" />
          </Link>
          {currentUser?.role !== 'Sales Person' && (
            <>
              <Link
                to={`/products/edit/${row.id}`}
                title="Edit Product"
                className="p-1.5 bg-slate-50 text-slate-500 hover:text-amber-600 border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(row.id, row.name)}
                title="Delete Product"
                className="p-1.5 bg-slate-50 text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Products Catalog</h1>
          <p className="text-xs text-slate-500">Manage, inspect, and update your warehouse stock inventory items</p>
        </div>
        {currentUser?.role !== 'Sales Person' && (
          <button
            onClick={() => navigate('/products/add')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiPlus className="mr-1.5 w-4.5 h-4.5" />
            Add Product
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-800 rounded-lg bg-white placeholder-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative w-full sm:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-700 rounded-lg bg-white appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <FiFilter className="w-3 h-3" />
            </div>
          </div>

          {/* Supplier Filter */}
          <div className="relative w-full sm:w-48">
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-700 rounded-lg bg-white appearance-none cursor-pointer"
            >
              <option value="">All Suppliers</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <FiFilter className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        emptyTitle="No products found"
        emptyDesc="Try refining your search query or filters above."
        actionText="Add Product"
        onAction={() => navigate('/products/add')}
      />
    </div>
  );
};

export default ProductList;
