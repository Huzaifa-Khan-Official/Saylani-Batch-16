import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/FormInputs';
import Badge from '../../components/ui/Badge';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiLock, FiAlertOctagon } from 'react-icons/fi';

const UserManagement = () => {
  const { users, addUser, editUser, deleteUser, currentUser } = useInventory();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null means adding

  // Form State
  const [form, setForm] = useState({ name: '', email: '', role: 'Sales Person', status: 'Active' });
  const [error, setError] = useState('');

  // Access check
  if (currentUser?.role !== 'Admin') {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-xl text-center p-8 shadow-xs max-w-lg mx-auto">
        <div className="p-3.5 bg-rose-50 text-rose-500 rounded-full mb-4 border border-rose-100">
          <FiAlertOctagon className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Access Restricted</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
          The User Management panel is only accessible to system **Administrators**. Your account role is registered as: **{currentUser?.role || 'Guest'}**.
        </p>
      </div>
    );
  }

  const handleOpenAdd = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', role: 'Sales Person', status: 'Active' });
    setError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setError('');
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (id === currentUser.id) {
      alert('Action blocked. You cannot delete your own profile while logged in.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete user profile "${name}"?`)) {
      const res = deleteUser(id);
      if (!res.success) {
        alert(res.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // Email duplicate check
    const isDuplicate = users.some(
      u => u.email.toLowerCase() === form.email.trim().toLowerCase() && (!editingUser || u.id !== editingUser.id)
    );
    if (isDuplicate) {
      setError('A user account with this email address already exists.');
      return;
    }

    if (editingUser) {
      editUser({ ...editingUser, ...form });
    } else {
      addUser(form);
    }
    setModalOpen(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Inventory Manager': return 'warning';
      case 'Sales Person': return 'info';
      default: return 'default';
    }
  };

  const getStatusVariant = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  const columns = [
    {
      header: 'Avatar',
      key: 'avatar',
      render: (row) => (
        <img 
          src={row.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60'} 
          alt={row.name} 
          className="w-9 h-9 rounded-full object-cover border border-slate-100"
        />
      )
    },
    {
      header: 'Name',
      key: 'name',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-800">{row.name}</span>
          {row.id === currentUser.id && (
            <span className="ml-1.5 text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold rounded-sm uppercase">You</span>
          )}
        </div>
      )
    },
    {
      header: 'Email Address',
      key: 'email',
    },
    {
      header: 'Assigned Role',
      key: 'role',
      render: (row) => <Badge variant={getRoleBadgeVariant(row.role)}>{row.role}</Badge>
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
          <button
            onClick={() => handleOpenEdit(row)}
            title="Edit User Profile"
            className="p-1.5 bg-slate-50 text-slate-500 hover:text-amber-600 border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors active:scale-95"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            disabled={row.id === currentUser.id}
            title={row.id === currentUser.id ? 'You cannot delete yourself' : 'Delete User Profile'}
            className={`p-1.5 border rounded-lg transition-colors active:scale-95 ${
              row.id === currentUser.id 
                ? 'bg-slate-50/50 text-slate-300 border-slate-100 cursor-not-allowed' 
                : 'bg-slate-50 text-slate-500 hover:text-rose-600 border-slate-200 hover:bg-rose-50'
            }`}
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-xs text-slate-500">Configure access levels, profile credentials, and role privileges</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
        >
          <FiPlus className="mr-1.5 w-4.5 h-4.5" />
          Add User Account
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search accounts by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-slate-800 rounded-lg bg-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        emptyTitle="No users found"
        emptyDesc="Create a new user profile using the button in the top right."
        actionText="Add User Account"
        onAction={handleOpenAdd}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Modify User Profile' : 'Register New User Account'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2 shrink-0"></span>
              {error}
            </div>
          )}

          <Input
            label="Full Profile Name"
            id="user-name"
            placeholder="e.g. Jane Doe"
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <Input
            label="Corporate Email Address"
            id="user-email"
            type="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Workplace Role"
              id="user-role"
              value={form.role}
              onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Inventory Manager', label: 'Inventory Manager' },
                { value: 'Sales Person', label: 'Sales Person' }
              ]}
            />

            <Select
              label="Account Status"
              id="user-status"
              value={form.status}
              onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
            />
          </div>

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
              {editingUser ? 'Apply Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
