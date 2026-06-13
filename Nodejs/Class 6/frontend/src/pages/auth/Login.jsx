import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Input, Select } from '../../components/ui/FormInputs';
import { FiLock, FiMail, FiUserCheck, FiPackage } from 'react-icons/fi';

const Login = () => {
  const { login, currentUser } = useInventory();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Small delay to simulate auth network roundtrip
    setTimeout(() => {
      const res = login(email, password, role);
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Invalid credentials for chosen role.');
      }
    }, 600);
  };

  // Helper to load quick test credentials
  const loadPreset = (presetEmail, presetRole) => {
    setEmail(presetEmail);
    setPassword('password123');
    setRole(presetRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2 text-indigo-600 mb-2">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/20">
            <FiPackage className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-800 tracking-tight">
          StockMaster Pro
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in to access your inventory management workspace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-100 shadow-md sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg p-3.5 font-medium flex items-center">
              <span className="w-2 h-2 bg-rose-500 rounded-full mr-2 shrink-0"></span>
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm text-slate-800 border-slate-200 placeholder-slate-400 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiLock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm text-slate-800 border-slate-200 placeholder-slate-400 bg-white"
                  required
                />
              </div>
            </div>

            <Select
              label="Select Work Role"
              id="role-dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Inventory Manager', label: 'Inventory Manager' },
                { value: 'Sales Person', label: 'Sales Person' }
              ]}
            />

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-98"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick presets for development demonstration */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-slate-400 font-semibold tracking-wider">Demo Quick Login</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => loadPreset('admin@ims.com', 'Admin')}
                className="px-2 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-left transition-all hover:-translate-y-0.5"
              >
                <p className="text-[10px] font-bold text-indigo-600 uppercase">Admin</p>
                <p className="text-[9px] text-slate-500 truncate">admin@ims.com</p>
              </button>
              <button
                onClick={() => loadPreset('manager@ims.com', 'Inventory Manager')}
                className="px-2 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-left transition-all hover:-translate-y-0.5"
              >
                <p className="text-[10px] font-bold text-amber-600 uppercase">Manager</p>
                <p className="text-[9px] text-slate-500 truncate">manager@ims.com</p>
              </button>
              <button
                onClick={() => loadPreset('sales@ims.com', 'Sales Person')}
                className="px-2 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-left transition-all hover:-translate-y-0.5"
              >
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Sales</p>
                <p className="text-[9px] text-slate-500 truncate">sales@ims.com</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
