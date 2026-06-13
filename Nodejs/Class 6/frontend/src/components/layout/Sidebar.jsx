import React from 'react';
import { NavLink } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { 
  FiGrid, FiPackage, FiLayers, FiUsers, FiUser, 
  FiTruck, FiArrowDownLeft, FiArrowUpRight, FiClipboard
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser } = useInventory();
  const isAdmin = currentUser?.role === 'Admin';

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Products', path: '/products', icon: FiPackage },
    { name: 'Categories', path: '/categories', icon: FiLayers },
    { name: 'Suppliers', path: '/suppliers', icon: FiTruck },
    { name: 'Purchases', path: '/purchases', icon: FiArrowDownLeft },
    { name: 'Sales', path: '/sales', icon: FiArrowUpRight },
    { name: 'Inventory', path: '/inventory', icon: FiClipboard },
    ...(isAdmin ? [{ name: 'Users', path: '/users', icon: FiUsers }] : []),
    { name: 'Profile', path: '/profile', icon: FiUser },
  ];

  const activeClass = "flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 transition-all border-l-4 border-indigo-600";
  const inactiveClass = "flex items-center px-4 py-2.5 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border-l-4 border-transparent";

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Brand Title */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 bg-indigo-50/20">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <FiPackage className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 text-base tracking-tight">
                StockMaster <span className="text-indigo-600">Pro</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                  <Icon className="w-5 h-5 mr-3 shrink-0" />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info showing current user info */}
        {currentUser && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-700 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
