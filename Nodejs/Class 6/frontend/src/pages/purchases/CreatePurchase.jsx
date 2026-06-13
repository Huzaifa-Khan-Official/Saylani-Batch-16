import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Input, Select } from '../../components/ui/FormInputs';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const CreatePurchase = () => {
  const { products, suppliers, addPurchase } = useInventory();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productId: '',
    supplier: '',
    quantity: '',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Initialize product and supplier selection
  useEffect(() => {
    if (products.length > 0) {
      const defaultProd = products[0];
      setForm(prev => ({
        ...prev,
        productId: defaultProd.id,
        supplier: defaultProd.supplier || (suppliers[0]?.name || ''),
        price: Math.round(defaultProd.price * 0.8) // Mock wholesale cost at 80% of selling price
      }));
    }
  }, [products, suppliers]);

  const handleProductChange = (productId) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setForm(prev => ({
        ...prev,
        productId,
        supplier: prod.supplier || (suppliers[0]?.name || ''),
        price: Math.round(prod.price * 0.8)
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
    if (!form.supplier) tempErrors.supplier = 'Supplier selection is required';
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) <= 0) {
      tempErrors.quantity = 'Quantity must be a positive number';
    }
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      tempErrors.price = 'Purchase price must be a positive number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const prod = products.find(p => p.id === form.productId);
    addPurchase({
      productId: form.productId,
      productName: prod ? prod.name : 'Unknown Product',
      supplier: form.supplier,
      quantity: Number(form.quantity),
      price: Number(form.price),
      date: form.date
    });
    navigate('/purchases');
  };

  const totalCost = (Number(form.quantity) || 0) * (Number(form.price) || 0);

  const productOptions = products.map(p => ({ value: p.id, label: `${p.name} (${p.sku})` }));
  const supplierOptions = suppliers.map(s => ({ value: s.name, label: s.name }));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="flex items-center space-x-3">
        <Link 
          to="/purchases"
          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Issue Supply Purchase Receipt</h1>
          <p className="text-xs text-slate-500">Record incoming warehouse restock transactions from vendor distributors</p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Select Product SKU"
            id="productId"
            name="productId"
            value={form.productId}
            onChange={handleChange}
            options={productOptions}
            error={errors.productId}
          />

          <Select
            label="Associate Vendor Supplier"
            id="supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            options={supplierOptions}
            error={errors.supplier}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Inbound Quantity"
            id="quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            error={errors.quantity}
            placeholder="e.g. 50"
            required
          />

          <Input
            label="Unit Cost ($)"
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="e.g. 75.00"
            required
          />

          <Input
            label="Receipt Date"
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dynamic calculation summary */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Estimated Total Cost</span>
            <span className="text-2xl font-bold text-indigo-600">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <p className="text-[10px] text-indigo-500 max-w-[200px] text-right font-medium">
            Submitting this form immediately updates product stock and flags low stock checks.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-2.5 pt-4 border-t border-slate-100">
          <Link
            to="/purchases"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center shadow-xs transition-all active:scale-98"
          >
            <FiSave className="mr-1.5 w-4 h-4" />
            File Purchase Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchase;
