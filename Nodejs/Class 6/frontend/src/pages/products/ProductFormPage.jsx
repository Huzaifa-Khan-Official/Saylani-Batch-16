import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Input, Select, Textarea } from '../../components/ui/FormInputs';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

const ProductFormPage = () => {
  const { addProduct, editProduct, products, categories, suppliers } = useInventory();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
    supplier: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = products.find(p => p.id === id);
      if (existing) {
        setForm(existing);
      } else {
        navigate('/products');
      }
    } else {
      // Pre-select first category and supplier if available
      setForm(prev => ({
        ...prev,
        category: categories[0]?.name || '',
        supplier: suppliers[0]?.name || '',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60' // red sneaker default
      }));
    }
  }, [id, isEditMode, products, categories, suppliers, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageMock = (e) => {
    // Inject a high quality mockup image from Unsplash to maintain aesthetics
    const images = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60', // watch
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60', // headphones
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60', // red shoe
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop&q=60', // glass
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&auto=format&fit=crop&q=60'  // boot
    ];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    setForm(prev => ({
      ...prev,
      image: randomImg
    }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Product name is required';
    if (!form.sku.trim()) tempErrors.sku = 'SKU is required';
    if (isNaN(form.price) || Number(form.price) <= 0) tempErrors.price = 'Price must be a positive number';
    if (isNaN(form.stock) || Number(form.stock) < 0) tempErrors.stock = 'Stock must be non-negative';
    if (!form.category) tempErrors.category = 'Category is required';
    if (!form.supplier) tempErrors.supplier = 'Supplier is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode) {
      editProduct(form);
    } else {
      addProduct(form);
    }
    navigate('/products');
  };

  const categoryOptions = categories.map(c => ({ value: c.name, label: c.name }));
  const supplierOptions = suppliers.map(s => ({ value: s.name, label: s.name }));

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back button */}
      <div className="flex items-center space-x-3">
        <Link 
          to="/products"
          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {isEditMode ? 'Modify Product Specifications' : 'Catalog New Product Listing'}
          </h1>
          <p className="text-xs text-slate-500">
            {isEditMode ? 'Alter database attributes of stock item' : 'Register brand new stock SKU details'}
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. Mechanical Keyboard"
            required
          />

          <Input
            label="SKU Identifier"
            id="sku"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            error={errors.sku}
            placeholder="e.g. MCH-KB-RGB"
            disabled={isEditMode}
            required
          />
        </div>

        <Textarea
          label="Product Description"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Detailed description of features, materials, and size dimensions..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Selling Price ($)"
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="99.99"
            required
          />

          <Input
            label="Available Stock Units"
            id="stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            error={errors.stock}
            placeholder="10"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category Group"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={categoryOptions}
            error={errors.category}
          />

          <Select
            label="Main Supplier"
            id="supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            options={supplierOptions}
            error={errors.supplier}
          />
        </div>

        {/* Image Mock Upload */}
        <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/50">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Product Catalog Image
          </label>
          <div className="flex items-center space-x-4">
            <img
              src={form.image || 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=100&auto=format&fit=crop&q=60'}
              alt="Preview"
              className="w-16 h-16 object-cover border border-slate-200 rounded-lg"
            />
            <div className="space-y-1">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleImageMock}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center transition-all"
                >
                  <FiUpload className="mr-1.5 w-3.5 h-3.5 text-indigo-600" />
                  Trigger Mock Upload
                </button>
              </div>
              <p className="text-[10px] text-slate-400">Select to assign a random high resolution demo image</p>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-2.5 pt-4 border-t border-slate-100">
          <Link
            to="/products"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center shadow-xs transition-all active:scale-98"
          >
            <FiSave className="mr-1.5 w-4 h-4" />
            Save Stock Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
