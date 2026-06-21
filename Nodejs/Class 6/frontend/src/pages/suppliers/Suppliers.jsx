import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { Input } from '../../components/ui/FormInputs';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch, FiTruck } from 'react-icons/fi';

const Suppliers = () => {
  const { suppliers, products, addSupplier, editSupplier, deleteSupplier, currentUser } = useInventory();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSup, setEditingSup] = useState(null); // null means adding

  // Form State
  const [form, setForm] = useState({ name: '', email: '', contact: '', address: '' });
  const [error, setError] = useState('');

  const handleOpenAdd = () => {
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage suppliers.');
      return;
    }
    setEditingSup(null);
    setForm({ name: '', email: '', contact: '', address: '' });
    setError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (sup) => {
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage suppliers.');
      return;
    }
    setEditingSup(sup);
    setForm({ name: sup.name, email: sup.email, contact: sup.contact, address: sup.address });
    setError('');
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    console.log("id ==>", id);
    
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage suppliers.');
      return;
    }

    // const linkedProducts = products.filter(p => p.supplier === name).length;
    // if (linkedProducts > 0) {
    //   alert(`Cannot delete supplier. there are ${linkedProducts} products supplied by "${name}". Re-assign those products to another supplier first.`);
    //   return;
    // }

    deleteSupplier(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.contact.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // Duplicate check
    const isDuplicate = suppliers && suppliers.some(
      s => s.name.toLowerCase() === form.name.trim().toLowerCase() && (!editingSup || s._id !== editingSup._id)
    );
    if (isDuplicate) {
      setError('A supplier with this name already exists.');
      return;
    }

    if (editingSup) {
      editSupplier({ ...editingSup, ...form });
    } else {
      addSupplier(form);
    }
    setModalOpen(false);
  };

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.contact && s.contact.includes(search))
  );

  const columns = [
    {
      header: 'Supplier Name',
      key: 'name',
      render: (row) => (
        <div>
          <Link to={`/suppliers/${row._id}`} className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
            {row.name}
          </Link>
        </div>
      )
    },
    {
      header: 'Email Address',
      key: 'email',
    },
    {
      header: 'Contact Number',
      key: 'contact',
    },
    {
      header: 'Physical Address',
      key: 'address',
      render: (row) => (
        <span className="text-xs text-slate-500 max-w-[200px] block truncate" title={row.address}>
          {row.address}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/suppliers/${row._id}`}
            title="View Details"
            className="p-1.5 bg-slate-50 text-slate-500 hover:text-indigo-600 border border-slate-200 rounded-lg hover:bg-indigo-50 transition-colors active:scale-95"
          >
            <FiEye className="w-4 h-4" />
          </Link>
          {currentUser?.role !== 'Sales Person' && (
            <>
              <button
                onClick={() => handleOpenEdit(row)}
                title="Edit Supplier"
                className="p-1.5 bg-slate-50 text-slate-500 hover:text-amber-600 border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors active:scale-95"
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(row._id, row.name)}
                title="Delete Supplier"
                className="p-1.5 bg-slate-50 text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 transition-colors active:scale-95"
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Suppliers Directory</h1>
          <p className="text-xs text-slate-500">Coordinate and contact wholesale distribution agencies supplying your inventory</p>
        </div>
        {currentUser?.role !== 'Sales Person' && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiPlus className="mr-1.5 w-4.5 h-4.5" />
            Add Supplier
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-800 rounded-lg bg-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredSuppliers}
        emptyTitle="No suppliers found"
        emptyDesc="Create a new supplier profile to manage vendor catalog items."
        actionText="Add Supplier"
        onAction={handleOpenAdd}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSup ? 'Modify Supplier details' : 'Register New Vendor Supplier'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2 shrink-0"></span>
              {error}
            </div>
          )}

          <Input
            label="Supplier Company Name"
            id="sup-name"
            placeholder="e.g. Acer Logistics Inc."
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <Input
            label="Contact Email"
            id="sup-email"
            type="email"
            placeholder="sales@supplier.com"
            value={form.email}
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />

          <Input
            label="Contact Number"
            id="sup-contact"
            type="tel"
            placeholder="1-800-555-0199"
            value={form.contact}
            onChange={(e) => setForm(prev => ({ ...prev, contact: e.target.value }))}
            required
          />

          <Input
            label="Physical Address"
            id="sup-address"
            placeholder="Street Address, Suite, City, State ZIP"
            value={form.address}
            onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
          />

          <div className="flex justify-end space-x-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              {editingSup ? 'Apply Changes' : 'Create Supplier'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Suppliers;
