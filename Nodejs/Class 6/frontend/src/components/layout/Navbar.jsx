import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiLogOut, FiMenu } from 'react-icons/fi';
import Badge from '../ui/Badge';

const Navbar = ({ onMenuToggle }) => {
  const { currentUser, logout } = useInventory();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
    <header className="bg-white border-b border-slate-100 h-16 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all active:scale-95"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Global mock search bar */}
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64 lg:w-80">
          <FiSearch className="text-slate-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search items, SKU, transactions..."
            className="bg-transparent border-0 outline-hidden text-xs text-slate-700 w-full placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification bell */}
        <button className="p-2 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors relative">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile display */}
        {currentUser && (
          <div className="flex items-center space-x-3 border-l border-slate-100 pl-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-50"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800">{currentUser.name}</p>
              <div className="mt-0.5">
                <Badge variant={getRoleBadgeVariant(currentUser.role)}>{currentUser.role}</Badge>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              title="Logout Session"
              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors ml-2"
            >
              <FiLogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
