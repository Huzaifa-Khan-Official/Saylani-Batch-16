import React, { useState, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { Input } from '../../components/ui/FormInputs';
import Badge from '../../components/ui/Badge';
import { FiUser, FiMail, FiShield, FiCheck, FiRefreshCw } from 'react-icons/fi';

const Profile = () => {
  const { currentUser, updateProfile } = useInventory();

  const [form, setForm] = useState({ name: '', email: '', avatar: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const cycleAvatar = () => {
    // Selection of premium demo avatars from Unsplash
    const avatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', // women
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', // men 1
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', // men 2
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', // women 2
      'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80'  // men 3
    ];

    const currentIdx = avatars.indexOf(form.avatar);
    const nextIdx = (currentIdx + 1) % avatars.length;
    setForm(prev => ({ ...prev, avatar: avatars[nextIdx] }));
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Inventory Manager': return 'warning';
      case 'Sales Person': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">User Profile</h1>
        <p className="text-xs text-slate-500">Configure your personal contact data and visual display avatar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card View */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm p-6 text-center space-y-4">
            <div className="relative inline-block mx-auto">
              <img
                src={form.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-indigo-50 shadow-inner"
              />
              <button
                type="button"
                onClick={cycleAvatar}
                title="Change Avatar image"
                className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full border-2 border-white shadow-xs transition-transform active:scale-90"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800">{currentUser?.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser?.email}</p>
            </div>

            <div className="pt-2">
              <Badge variant={getRoleBadgeVariant(currentUser?.role)}>{currentUser?.role}</Badge>
            </div>

            <div className="pt-4 border-t border-slate-100 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-center">
                <FiMail className="w-4 h-4 text-slate-400 mr-2" />
                <span>Verified profile email</span>
              </div>
              <div className="flex items-center">
                <FiShield className="w-4 h-4 text-slate-400 mr-2" />
                <span>Authorized role capabilities active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Edit Profile Attributes</h3>

            {success && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium flex items-center">
                <FiCheck className="w-4 h-4 mr-2 shrink-0" />
                Your profile updates have been stored successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Display Name"
                id="profile-name"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <Input
                label="Registered Corporate Email"
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Workspace Role Privilege</label>
                <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 font-semibold cursor-not-allowed">
                  {currentUser?.role} (Locked: Contact IT Support to alter structural roles)
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center"
                >
                  <FiCheck className="mr-1.5 w-4 h-4" />
                  Save profile changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
