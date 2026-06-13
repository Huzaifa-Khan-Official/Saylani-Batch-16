import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Input, Select } from '../../components/ui/FormInputs';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const CreateSale = () => {
  const { products, addSale } = useInventory();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialize selection
  useEffect(() => {
    if (products.length > 0) {
      const defaultProd = products[0];
      setSelectedProduct(defaultProd);
      setForm(prev => ({
        ...prev,
        productId: defaultProd.id,
        price: defaultProd.price
      }));
    }
  }, [products]);

  const handleProductChange = (productId) => {
    const prod = products.find(p => p.id === productId);
    setSelectedProduct(prod);
    if (prod) {
      setForm(prev => ({
        ...prev,
        productId,
        price: prod.price
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productId') {
      handleProductChange(value);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.productId) tempErrors.productId = 'Product selection is required';
    
    const qty = Number(form.quantity);
    if (!form.quantity || isNaN(qty) || qty <= 0) {
      tempErrors.quantity = 'Quantity must be a positive number';
    } else if (selectedProduct && selectedProduct.stock < qty) {
      tempErrors.quantity = `Insufficient stock. Only ${selectedProduct.stock} units are available.`;
    }

    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      tempErrors.price = 'Selling price must be a positive number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = addSale({
      productId: form.productId,
      quantity: Number(form.quantity),
      price: Number(form.price),
      date: form.date
    });

    if (res.success) {
      navigate('/sales');
    } else {
      setErrors({ quantity: res.message });
    }
  };

  const totalRevenue = (Number(form.quantity) || 0) * (Number(form.price) || 0);

  const productOptions = products.map(p => ({ 
    value: p.id, 
    label: `${p.name} - SKU: ${p.sku} (${p.stock} units in stock)` 
  }));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="flex items-center space-x-3">
        <Link 
          to="/sales"
          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Issue Customer Invoice (Sale)</h1>
          <p className="text-xs text-slate-500">Record outgoing warehouse stock shipments to customers</p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
        <Select
          label="Select Product SKU"
          id="productId"
          name="productId"
          value={form.productId}
          onChange={handleChange}
          options={productOptions}
          error={errors.productId}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              label="Invoice Quantity"
              id="quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              error={errors.quantity}
              placeholder="e.g. 5"
              required
            />
            {selectedProduct && !errors.quantity && (
              <span className="absolute right-0 top-0 text-[10px] font-semibold text-slate-400">
                Max Available: {selectedProduct.stock}
              </span>
            )}
          </div>

          <Input
            label="Selling Unit Price ($)"
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="e.g. 99.00"
            required
          />

          <Input
            label="Invoice Date"
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dynamic calculation summary */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Total Sales Value</span>
            <span className="text-2xl font-bold text-emerald-600">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <p className="text-[10px] text-emerald-600 max-w-[200px] text-right font-medium">
            Filing this order immediately reduces inventory stock levels and flags warning indicators.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-2.5 pt-4 border-t border-slate-100">
          <Link
            to="/sales"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center shadow-xs transition-all active:scale-98"
          >
            <FiSave className="mr-1.5 w-4 h-4" />
            File Invoice Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSale;
