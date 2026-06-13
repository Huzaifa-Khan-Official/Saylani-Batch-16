import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialProducts,
  initialCategories,
  initialSuppliers,
  initialPurchases,
  initialSales,
  initialUsers
} from '../data/mockData';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ims_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ims_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ims_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('ims_suppliers');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('ims_purchases');
    return saved ? JSON.parse(saved) : initialPurchases;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('ims_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ims_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ims_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ims_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ims_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('ims_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('ims_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('ims_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ims_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ims_current_user');
    }
  }, [currentUser]);

  // Auth actions
  const login = (email, password, role) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) {
      if (found.status === 'Inactive') {
        return { success: false, message: 'This account has been disabled. Contact an administrator.' };
      }
      setCurrentUser(found);
      return { success: true };
    } else {
      // Create a dynamic profile for test credentials if they don't match exactly
      const name = email.split('@')[0];
      const newUser = {
        id: 'u_' + Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        role: role,
        status: 'Active',
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Helper to determine status based on stock level
  const determineStatus = (stock) => {
    const num = Number(stock);
    if (num <= 0) return 'Out of Stock';
    if (num < 10) return 'Low Stock';
    return 'In Stock';
  };

  // Products CRUD
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: 'p_' + Date.now(),
      stock: Number(productData.stock),
      price: Number(productData.price),
      status: determineStatus(productData.stock)
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === updatedProduct.id
          ? {
              ...updatedProduct,
              stock: Number(updatedProduct.stock),
              price: Number(updatedProduct.price),
              status: determineStatus(updatedProduct.stock)
            }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Categories CRUD
  const addCategory = (categoryData) => {
    const newCat = {
      ...categoryData,
      id: 'cat_' + Date.now()
    };
    setCategories(prev => [...prev, newCat]);
  };

  const editCategory = (updatedCat) => {
    setCategories(prev => prev.map(c => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Suppliers CRUD
  const addSupplier = (supplierData) => {
    const newSup = {
      ...supplierData,
      id: 'sup_' + Date.now()
    };
    setSuppliers(prev => [...prev, newSup]);
  };

  const editSupplier = (updatedSup) => {
    setSuppliers(prev => prev.map(s => (s.id === updatedSup.id ? updatedSup : s)));
  };

  const deleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  // Purchase CRUD & Stock Update
  const addPurchase = (purchaseData) => {
    const newPurchase = {
      ...purchaseData,
      id: 'PUR-' + String(Date.now()).slice(-6),
      quantity: Number(purchaseData.quantity),
      price: Number(purchaseData.price),
      total: Number(purchaseData.quantity) * Number(purchaseData.price),
      date: purchaseData.date || new Date().toISOString().split('T')[0]
    };

    setPurchases(prev => [newPurchase, ...prev]);

    // Update Product Stock
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === purchaseData.productId) {
          const newStock = p.stock + newPurchase.quantity;
          return {
            ...p,
            stock: newStock,
            status: determineStatus(newStock)
          };
        }
        return p;
      })
    );
  };

  // Sale CRUD & Stock Update
  const addSale = (saleData) => {
    const targetProduct = products.find(p => p.id === saleData.productId);
    const saleQty = Number(saleData.quantity);

    if (!targetProduct) {
      return { success: false, message: 'Product not found.' };
    }

    if (targetProduct.stock < saleQty) {
      return {
        success: false,
        message: `Insufficient stock. Current available stock for ${targetProduct.name} is ${targetProduct.stock}.`
      };
    }

    const newSale = {
      ...saleData,
      id: 'SAL-' + String(Date.now()).slice(-6),
      productName: targetProduct.name,
      quantity: saleQty,
      price: Number(saleData.price),
      total: saleQty * Number(saleData.price),
      date: saleData.date || new Date().toISOString().split('T')[0]
    };

    setSales(prev => [newSale, ...prev]);

    // Update Product Stock
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === saleData.productId) {
          const newStock = p.stock - saleQty;
          return {
            ...p,
            stock: newStock,
            status: determineStatus(newStock)
          };
        }
        return p;
      })
    );

    return { success: true };
  };

  // User CRUD
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: 'u_' + Date.now(),
      avatar: userData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
    };
    setUsers(prev => [...prev, newUser]);
  };

  const editUser = (updatedUser) => {
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const deleteUser = (id) => {
    if (currentUser && currentUser.id === id) {
      return { success: false, message: 'You cannot delete yourself while logged in!' };
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    return { success: true };
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      name: profileData.name,
      email: profileData.email,
      avatar: profileData.avatar || currentUser.avatar
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? updated : u)));
  };

  return (
    <InventoryContext.Provider
      value={{
        currentUser,
        products,
        categories,
        suppliers,
        purchases,
        sales,
        users,
        login,
        logout,
        addProduct,
        editProduct,
        deleteProduct,
        addCategory,
        editCategory,
        deleteCategory,
        addSupplier,
        editSupplier,
        deleteSupplier,
        addPurchase,
        addSale,
        addUser,
        editUser,
        deleteUser,
        updateProfile
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
