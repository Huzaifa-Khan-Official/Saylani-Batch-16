import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialProducts,
  initialCategories,
  initialSuppliers,
  initialPurchases,
  initialSales,
  initialUsers
} from '../data/mockData';
import axios from "axios";
import api from '../configs/axios';

const InventoryContext = createContext();

// Fetched all categories
const fetchCategories = async () => {
  try {
    const res = await api.get("/api/admin/categories");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

// Fetched all suppliers
const fetchSuppliers = async () => {
  try {
    const res = await api.get("/api/admin/suppliers");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

// Fetched all products
const fetchProducts = async () => {
  try {
    const res = await api.get("/api/admin/products");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

// Fetched all purchases
const fetchPurchases = async () => {
  try {
    const res = await api.get("/api/admin/purchases");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

const mapProduct = (p) => ({
  ...p,
  id: p._id,
  category: p.category?.name || p.category || '',
  supplier: p.supplier?.name || p.supplier || ''
});

const mapPurchase = (pur) => ({
  ...pur,
  id: pur._id,
  productId: pur.productId?._id || pur.productId,
  productName: pur.productId?.name || 'Unknown Product',
  supplier: pur.supplier?.name || 'Unknown Supplier',
  date: pur.createdAt ? pur.createdAt.split('T')[0] : (pur.date || new Date().toISOString().split('T')[0])
});

// Fetched all sales
const fetchSales = async () => {
  try {
    const res = await api.get("/api/admin/sales");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

// Fetched dashboard overview
const fetchDashboardOverview = async () => {
  try {
    const res = await api.get("/api/admin/dashboard");
    return res.data.data
  } catch (error) {
    console.log("error ==>", error.message);
  }
}

const mapSale = (s) => ({
  ...s,
  id: s._id,
  productId: s.productId?._id || s.productId,
  productName: s.productId?.name || 'Unknown Product',
  date: s.createdAt ? s.createdAt.split('T')[0] : (s.date || new Date().toISOString().split('T')[0])
});

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

  const [products, setProducts] = useState([]);

  // const [categories, setCategories] = useState(async () => {
  //   // const saved = localStorage.getItem('ims_categories');
  //   // if (saved) return JSON.parse(saved);

  //   const data = await fetchCategories()

  //   return data
  // });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ims_categories');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('ims_suppliers');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [purchases, setPurchases] = useState([]);

  const [sales, setSales] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [purchasesTrend, setPurchasesTrend] = useState([]);

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ims_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  useEffect(() => {
    if (!currentUser) {
      setCategories([]);
      setSuppliers([]);
      setProducts([]);
      setPurchases([]);
      setSales([]);
      setSalesTrend([]);
      setPurchasesTrend([]);
      return;
    }
    (
      async () => {
        const data = await fetchCategories()
        setCategories(data || [])
      }
    )();
    (
      async () => {
        const data = await fetchSuppliers()
        setSuppliers(data || [])
      }
    )();
    (
      async () => {
        const data = await fetchProducts()
        if (data) {
          setProducts(data.map(mapProduct))
        }
      }
    )();
    (
      async () => {
        const data = await fetchPurchases()
        if (data) {
          setPurchases(data.map(mapPurchase))
        }
      }
    )();
    (
      async () => {
        const data = await fetchSales()
        if (data) {
          setSales(data.map(mapSale))
        }
      }
    )();
    (
      async () => {
        const data = await fetchDashboardOverview()
        if (data) {
          setSalesTrend(data.salesTrend || [])
          setPurchasesTrend(data.purchasesTrend || [])
        }
      }
    )();
  }, [currentUser]);

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
  const login = async (email, password, role) => {
    try {
      // Create a dynamic profile for test credentials if they don't match exactly
      // const name = email.split('@')[0];
      // const newUser = {
      //   id: 'u_' + Date.now(),
      //   name: name.charAt(0).toUpperCase() + name.slice(1),
      //   email: email,
      //   role: role,
      //   status: 'Active',
      //   avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
      // };
      // setUsers(prev => [...prev, newUser]);
      // setCurrentUser(newUser);

      const res = await api.post("/api/auth/login", {
        email,
        password
      })

      setCurrentUser(res.data.data.token);
      return { success: true, res };
    } catch (error) {
      console.log("error ==>", error.message);

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
  const addProduct = async (productData) => {
    try {
      const res = await api.post("/api/admin/products", productData);
      const payload = res?.data?.data;
      if (payload) {
        setProducts((prev) => [mapProduct(payload), ...prev]);
      }
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const id = updatedProduct._id || updatedProduct.id;
      const res = await api.put(`/api/admin/products/${id}`, updatedProduct);
      const payload = res?.data?.data;
      if (payload) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? mapProduct(payload) : p))
        );
      }
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await api.delete(`/api/admin/products/${id}`);
      if (res.data.status) {
        setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      }
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  // Categories CRUD
  const addCategory = async (categoryData) => {
    try {
      const res = await api.post("/api/admin/categories", categoryData);

      // Backend can return either an array or a single category object.
      const payload = res?.data?.data;

      setCategories((prev) => {
        if (Array.isArray(payload)) return payload;
        if (payload && typeof payload === 'object') return [...prev, payload];
        return prev;
      });
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  const editCategory = async (updatedCat) => {    
    const res = await api.put(`/api/admin/categories/${updatedCat._id}`, {
      name: updatedCat.name,
      description: updatedCat.description
    })
    setCategories(prev => prev.map(c => (c._id === updatedCat._id ? updatedCat : c)));
  };

  const deleteCategory = async (id) => {
    const res = await api.delete(`/api/admin/categories/${id}`)

    console.log("res ==>", res.data);
    if (res.data.status) {
      setCategories(prev => prev.filter(c => c._id !== id));
    } else {

    }
  };

  // Suppliers CRUD
  const addSupplier = async (supplierData) => {
    try {
      const res = await api.post("/api/admin/suppliers", supplierData);
      const payload = res?.data?.data;
      setSuppliers((prev) => {
        if (Array.isArray(payload)) return payload;
        if (payload && typeof payload === 'object') return [...prev, payload];
        return prev;
      });
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  const editSupplier = async (updatedSup) => {
    try {      
      const res = await api.put(`/api/admin/suppliers/${updatedSup._id}`, {
        name: updatedSup.name,
        email: updatedSup.email,
        contact: updatedSup.contact,
        address: updatedSup.address
      });
      setSuppliers(prev => prev.map(s => (s._id === updatedSup._id ? updatedSup : s)));
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      console.log("id in delete Supplier ===>", id);
      
      const res = await api.delete(`/api/admin/suppliers/${id}`);
      console.log("res ==>", res.data);
      
      if (res.data.status) {
        setSuppliers(prev => prev.filter(s => s._id !== id));
      }
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  // Purchase CRUD & Stock Update
  const addPurchase = async (purchaseData) => {
    try {
      const res = await api.post("/api/admin/purchases", purchaseData);
      const payload = res?.data?.data;
      if (payload) {
        setPurchases((prev) => [mapPurchase(payload), ...prev]);

        // Re-fetch products to ensure stock/status is fully synced with database!
        const prodRes = await api.get("/api/admin/products");
        if (prodRes?.data?.data) {
          setProducts(prodRes.data.data.map(mapProduct));
        }

        // Re-fetch dashboard trend data
        const dashData = await fetchDashboardOverview();
        if (dashData) {
          setSalesTrend(dashData.salesTrend || []);
          setPurchasesTrend(dashData.purchasesTrend || []);
        }
      }
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  // Sale CRUD & Stock Update
  const addSale = async (saleData) => {
    try {
      const res = await api.post("/api/admin/sales", saleData);
      const payload = res?.data?.data;
      if (payload) {
        setSales((prev) => [mapSale(payload), ...prev]);

        // Re-fetch products to ensure stock/status is fully synced with database!
        const prodRes = await api.get("/api/admin/products");
        if (prodRes?.data?.data) {
          setProducts(prodRes.data.data.map(mapProduct));
        }

        // Re-fetch dashboard trend data
        const dashData = await fetchDashboardOverview();
        if (dashData) {
          setSalesTrend(dashData.salesTrend || []);
          setPurchasesTrend(dashData.purchasesTrend || []);
        }
        return { success: true };
      }
      return { success: false, message: 'Failed to record sale.' };
    } catch (error) {
      console.log("error ==>", error.message);
      return { success: false, message: error.response?.data?.message || error.message || 'Something went wrong.' };
    }
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
        updateProfile,
        salesTrend,
        purchasesTrend
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
