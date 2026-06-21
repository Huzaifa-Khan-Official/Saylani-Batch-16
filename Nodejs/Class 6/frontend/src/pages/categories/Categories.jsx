import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/FormInputs';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiLayers } from 'react-icons/fi';

const Categories = () => {
  const { categories, products, addCategory, editCategory, deleteCategory, currentUser } = useInventory();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null); // null means adding

  // Form State
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  // Handle open modal for create
  const handleOpenAdd = () => {
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage categories.');
      return;
    }
    setEditingCat(null);
    setForm({ name: '', description: '' });
    setError('');
    setModalOpen(true);
  };

  // Handle open modal for edit
  const handleOpenEdit = (cat) => {
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage categories.');
      return;
    }
    setEditingCat(cat);
    setForm({ name: cat.name, description: cat.description || '' });
    setError('');
    setModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id, name) => {

    console.log("id ==>", id);
    
    if (currentUser?.role === 'Sales Person') {
      alert('Unauthorized action. Only Admin or Inventory Manager can manage categories.');
      return;
    }

    const itemsCount = products.filter(p => p.category === name).length;
    if (itemsCount > 0) {
      if (!window.confirm(`Warning: There are ${itemsCount} products associated with the "${name}" category. Deleting this category will leave these products in a generic category. Proceed?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Are you sure you want to delete the "${name}" category?`)) {
        return;
      }
    }
    deleteCategory(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Category name is required.');
      return;
    }

    // Check for duplicate name
    const isDuplicate = categories && categories.some(
      c => c.name.toLowerCase() === form.name.trim().toLowerCase() && (!editingCat || (c._id || c.id) !== (editingCat._id || editingCat.id))
    );
    if (isDuplicate) {
      setError('A category with this name already exists.');
      return;
    }

    if (editingCat) {
      editCategory({ ...editingCat, ...form });
    } else {
      addCategory(form);
    }
    setModalOpen(false);
  };

  // Filter categories
  const filteredCategories = categories && categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    {
      header: 'Category Icon',
      key: 'icon',
      render: () => (
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg w-9 h-9 flex items-center justify-center border border-indigo-100">
          <FiLayers className="w-4.5 h-4.5" />
        </div>
      )
    },
    {
      header: 'Category Name',
      key: 'name',
      render: (row) => <span className="font-semibold text-slate-800">{row.name}</span>
    },
    {
      header: 'Description',
      key: 'description',
      render: (row) => (
        <span className="text-xs text-slate-500 max-w-70 block truncate" title={row.description}>
          {row.description || 'No description provided.'}
        </span>
      )
    },
    {
      header: 'Products Count',
      key: 'count',
      render: (row) => {
        const count = products.filter(p => p.category === row.name).length;
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${count > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-500'
            }`}>
            {count} products
          </span>
        );
      }
    },
    ...(currentUser?.role !== 'Sales Person' ? [{
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleOpenEdit(row)}
            title="Edit Category"
            className="p-1.5 bg-slate-50 text-slate-500 hover:text-amber-600 border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors active:scale-95"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row._id, row.name)}
            title="Delete Category"
            className="p-1.5 bg-slate-50 text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 transition-colors active:scale-95"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }] : [])
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Product Categories</h1>
          <p className="text-xs text-slate-500">Group and classify your products catalog tags for streamlined filtering</p>
        </div>
        {currentUser?.role !== 'Sales Person' && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <FiPlus className="mr-1.5 w-4.5 h-4.5" />
            Add Category
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
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-800 rounded-lg bg-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        emptyTitle="No categories found"
        emptyDesc="Create a new category using the button in the top right."
        actionText="Add Category"
        onAction={handleOpenAdd}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCat ? 'Modify Category' : 'Register New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2 shrink-0"></span>
              {error}
            </div>
          )}

          <Input
            label="Category Name"
            id="cat-name"
            placeholder="e.g. Smart Electronics"
            value={form.name}
            onChange={(e) => {
              setForm(prev => ({ ...prev, name: e.target.value }));
              setError('');
            }}
            required
          />

          <Textarea
            label="Description (Optional)"
            id="cat-desc"
            placeholder="e.g. Multi-media sound systems, visual displays..."
            value={form.description}
            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
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
              {editingCat ? 'Apply Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
