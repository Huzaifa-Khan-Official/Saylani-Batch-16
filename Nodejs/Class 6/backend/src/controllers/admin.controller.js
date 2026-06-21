import mongoose from "mongoose";
import Categories from "../models/categories.model.js"
import Suppliers from "../models/suppliers.model.js";
import Products from "../models/products.model.js";
import Purchase from "../models/purchase.model.js";
import Sale from "../models/sale.model.js";
import { errorRes, successRes } from "../utils/responseHandler.js"

// Category CRUD
const createCategory = async (req, res) => {
  try {
    console.log("req ==>", req.body);

    const { name, description } = req.body

    if (!name) {
      throw new Error("Please fill the name of the category!")
    }

    const newCat = await Categories.create({
      name,
      description,
      userId: req.user._id
    })

    successRes(res, 200, true, "Category created successfully!", newCat)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.find({ userId: req.user._id })

    if (categories.length == 0) {
      throw new Error("Your category list is empty!")
    }

    successRes(res, 200, true, "Category fetched successfully!", categories)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id
    const category = await Categories.findByIdAndDelete(id)

    if (!category) {
      throw new Error("Category not found!")
    }
    successRes(res, 200, true, "Category deleted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Category Id is required!")
    }

    if (!name) {
      throw new Error("Please fill the name of the category!")
    }

    const updatedData = await Categories.findByIdAndUpdate(id, {
      name,
      description,
      userId: req.user._id
    }, { new: true })

    successRes(res, 200, true, "Category updated successfully!", updatedData)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}


// Supplier CRUD
const createSupplier = async (req, res) => {
  try {
    console.log("req ==>", req.body);

    const { name, email, contact, address } = req.body

    if (!name || !email || !contact || !address) {
      throw new Error("Please fill all the required fields!")
    }

    const newCat = await Suppliers.create({
      name, email, contact, address,
      userId: req.user._id
    })

    successRes(res, 200, true, "Supplier created successfully!", newCat)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllSuppliers = async (req, res) => {
  try {
    const categories = await Suppliers.find({ userId: req.user._id })

    if (categories.length == 0) {
      throw new Error("Your supplier list is empty!")
    }

    successRes(res, 200, true, "Supplier fetched successfully!", categories)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id
    const category = await Suppliers.findByIdAndDelete(id)

    if (!category) {
      throw new Error("Supplier not found!")
    }
    successRes(res, 200, true, "Supplier deleted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateSupplier = async (req, res) => {
  try {
    const { name, email, contact, address } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Supplier Id is required!")
    }

    if (!name || !email || !contact || !address) {
      throw new Error("Please fill the name of the category!")
    }

    const updatedData = await Suppliers.findByIdAndUpdate(id, {
      name, email, contact, address,
      userId: req.user._id
    }, { new: true })

    successRes(res, 200, true, "Supplier updated successfully!", updatedData)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

// Product CRUD
const createProduct = async (req, res) => {
  try {
    const { name, description, sku, price, stock, category, supplier, image, status } = req.body

    if (!name || !description || !sku || price === undefined || stock === undefined || !image) {
      throw new Error("Please fill all the required fields!")
    }

    // Resolve category and supplier names to ObjectIds if they are names (strings)
    let categoryId = null
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryId = category
      } else {
        const cat = await Categories.findOne({ name: category, userId: req.user._id })
        if (cat) categoryId = cat._id
      }
    }

    let supplierId = null
    if (supplier) {
      if (mongoose.Types.ObjectId.isValid(supplier)) {
        supplierId = supplier
      } else {
        const sup = await Suppliers.findOne({ name: supplier, userId: req.user._id })
        if (sup) supplierId = sup._id
      }
    }

    const newProduct = await Products.create({
      name,
      description,
      sku,
      price: Number(price),
      stock: Number(stock),
      category: categoryId,
      supplier: supplierId,
      image,
      status: status || (Number(stock) <= 0 ? 'Out of Stock' : Number(stock) < 10 ? 'Low Stock' : 'In Stock'),
      userId: req.user._id
    })

    // Populate category and supplier before returning to keep the frontend happy
    const populatedProduct = await Products.findById(newProduct._id)
      .populate("category")
      .populate("supplier")

    successRes(res, 200, true, "Product created successfully!", populatedProduct)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({ userId: req.user._id })
      .populate("category")
      .populate("supplier")

    successRes(res, 200, true, "Products fetched successfully!", products)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Products.findByIdAndDelete(id)

    if (!product) {
      throw new Error("Product not found!")
    }
    successRes(res, 200, true, "Product deleted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { name, description, sku, price, stock, category, supplier, image, status } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Product Id is required!")
    }

    // Resolve category and supplier names
    let categoryId = null
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryId = category
      } else {
        const cat = await Categories.findOne({ name: category, userId: req.user._id })
        if (cat) categoryId = cat._id
      }
    }

    let supplierId = null
    if (supplier) {
      if (mongoose.Types.ObjectId.isValid(supplier)) {
        supplierId = supplier
      } else {
        const sup = await Suppliers.findOne({ name: supplier, userId: req.user._id })
        if (sup) supplierId = sup._id
      }
    }

    const calculatedStatus = status || (Number(stock) <= 0 ? 'Out of Stock' : Number(stock) < 10 ? 'Low Stock' : 'In Stock')

    const updatedData = await Products.findByIdAndUpdate(id, {
      name,
      description,
      sku,
      price: Number(price),
      stock: Number(stock),
      category: categoryId,
      supplier: supplierId,
      image,
      status: calculatedStatus,
      userId: req.user._id
    }, { new: true })
      .populate("category")
      .populate("supplier")

    if (!updatedData) {
      throw new Error("Product not found!")
    }

    successRes(res, 200, true, "Product updated successfully!", updatedData)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

// Purchase CRUD
const createPurchase = async (req, res) => {
  try {
    const { productId, supplier, quantity, price } = req.body

    if (!productId || !supplier || !quantity || !price) {
      throw new Error("Please fill all the required fields!")
    }

    // Resolve supplier name if string
    let supplierId = null
    if (supplier) {
      if (mongoose.Types.ObjectId.isValid(supplier)) {
        supplierId = supplier
      } else {
        const sup = await Suppliers.findOne({ name: supplier, userId: req.user._id })
        if (sup) supplierId = sup._id
      }
    }

    if (!supplierId) {
      throw new Error("Supplier not found!")
    }

    // Update Product Stock on Purchase
    const product = await Products.findById(productId)
    if (!product) {
      throw new Error("Product not found!")
    }

    const purchaseQty = Number(quantity)
    const purchasePrice = Number(price)
    const totalCost = purchaseQty * purchasePrice

    // Increment stock
    product.stock += purchaseQty
    // Determine new status
    if (product.stock <= 0) {
      product.status = 'Out of Stock'
    } else if (product.stock < 10) {
      product.status = 'Low Stock'
    } else {
      product.status = 'In Stock'
    }
    await product.save()

    const newPurchase = await Purchase.create({
      productId,
      supplier: supplierId,
      quantity: purchaseQty,
      price: purchasePrice,
      total: totalCost,
      userId: req.user._id
    })

    const populatedPurchase = await Purchase.findById(newPurchase._id)
      .populate("productId")
      .populate("supplier")

    successRes(res, 200, true, "Purchase recorded and stock updated successfully!", populatedPurchase)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id })
      .populate("productId")
      .populate("supplier")

    successRes(res, 200, true, "Purchases fetched successfully!", purchases)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deletePurchase = async (req, res) => {
  try {
    const id = req.params.id
    const purchase = await Purchase.findByIdAndDelete(id)

    if (!purchase) {
      throw new Error("Purchase record not found!")
    }
    successRes(res, 200, true, "Purchase record deleted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updatePurchase = async (req, res) => {
  try {
    const { productId, supplier, quantity, price } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Purchase Id is required!")
    }

    let supplierId = null
    if (supplier) {
      if (mongoose.Types.ObjectId.isValid(supplier)) {
        supplierId = supplier
      } else {
        const sup = await Suppliers.findOne({ name: supplier, userId: req.user._id })
        if (sup) supplierId = sup._id
      }
    }

    const purchaseQty = Number(quantity)
    const purchasePrice = Number(price)
    const totalCost = purchaseQty * purchasePrice

    const updatedPurchase = await Purchase.findByIdAndUpdate(id, {
      productId,
      supplier: supplierId,
      quantity: purchaseQty,
      price: purchasePrice,
      total: totalCost,
      userId: req.user._id
    }, { new: true })
      .populate("productId")
      .populate("supplier")

    successRes(res, 200, true, "Purchase record updated successfully!", updatedPurchase)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

// Sale CRUD
const createSale = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body

    if (!productId || !quantity || price === undefined) {
      throw new Error("Please fill all the required fields!")
    }

    const product = await Products.findById(productId)
    if (!product) {
      throw new Error("Product not found!")
    }

    const saleQty = Number(quantity)
    const salePrice = Number(price)
    const totalRevenue = saleQty * salePrice

    if (product.stock < saleQty) {
      throw new Error(`Insufficient stock. Current available stock for ${product.name} is ${product.stock}.`)
    }

    // Decrement stock
    product.stock -= saleQty
    // Determine new status
    if (product.stock <= 0) {
      product.status = 'Out of Stock'
    } else if (product.stock < 10) {
      product.status = 'Low Stock'
    } else {
      product.status = 'In Stock'
    }
    await product.save()

    const newSale = await Sale.create({
      productId,
      quantity: saleQty,
      price: salePrice,
      total: totalRevenue,
      userId: req.user._id
    })

    const populatedSale = await Sale.findById(newSale._id)
      .populate("productId")

    successRes(res, 200, true, "Sale recorded and stock updated successfully!", populatedSale)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.user._id })
      .populate("productId")

    successRes(res, 200, true, "Sales fetched successfully!", sales)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deleteSale = async (req, res) => {
  try {
    const id = req.params.id
    const sale = await Sale.findById(id)

    if (!sale) {
      throw new Error("Sale record not found!")
    }

    // Revert stock on product
    const product = await Products.findById(sale.productId)
    if (product) {
      product.stock += sale.quantity
      if (product.stock <= 0) {
        product.status = 'Out of Stock'
      } else if (product.stock < 10) {
        product.status = 'Low Stock'
      } else {
        product.status = 'In Stock'
      }
      await product.save()
    }

    await Sale.findByIdAndDelete(id)

    successRes(res, 200, true, "Sale record deleted and stock reverted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateSale = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Sale Id is required!")
    }

    const sale = await Sale.findById(id)
    if (!sale) {
      throw new Error("Sale record not found!")
    }

    const newQty = Number(quantity)
    const newPrice = Number(price)
    const totalRevenue = newQty * newPrice

    // Adjust product stock based on quantity difference
    const product = await Products.findById(productId || sale.productId)
    if (product) {
      const diff = newQty - sale.quantity
      if (product.stock < diff) {
        throw new Error(`Insufficient stock. Current available stock is ${product.stock}.`)
      }
      product.stock -= diff
      if (product.stock <= 0) {
        product.status = 'Out of Stock'
      } else if (product.stock < 10) {
        product.status = 'Low Stock'
      } else {
        product.status = 'In Stock'
      }
      await product.save()
    }

    const updatedSale = await Sale.findByIdAndUpdate(id, {
      productId: productId || sale.productId,
      quantity: newQty,
      price: newPrice,
      total: totalRevenue,
      userId: req.user._id
    }, { new: true })
      .populate("productId")

    successRes(res, 200, true, "Sale record updated successfully!", updatedSale)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

// Dashboard Overview
const getDashboardOverview = async (req, res) => {
  try {
    console.log("req in dashboard overview");
    

    const userId = req.user._id

    // 1. Counts
    const totalProducts = await Products.countDocuments({ userId })
    const totalCategories = await Categories.countDocuments({ userId })
    const totalSuppliers = await Suppliers.countDocuments({ userId })
    const lowStockCount = await Products.countDocuments({ userId, stock: { $lt: 10 } })

    // 2. Total sums
    const purchasesSum = await Purchase.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ])
    const totalPurchasesCost = purchasesSum.length > 0 ? purchasesSum[0].total : 0

    const salesSum = await Sale.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ])
    const totalSalesRevenue = salesSum.length > 0 ? salesSum[0].total : 0

    // 3. Recents
    const recentPurchases = await Purchase.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("productId")
      .populate("supplier")

    console.log("recentPurchases ==>", recentPurchases);
    

    const recentSales = await Sale.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("productId")

    // 4. Trends (last 6 months)
    const startMonthDate = new Date();
    startMonthDate.setMonth(startMonthDate.getMonth() - 5);
    startMonthDate.setDate(1);
    startMonthDate.setHours(0, 0, 0, 0);

    const purchasesAgg = await Purchase.aggregate([
      { $match: { userId, createdAt: { $gte: startMonthDate } } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          total: { $sum: "$total" }
        }
      }
    ]);

    const salesAgg = await Sale.aggregate([
      { $match: { userId, createdAt: { $gte: startMonthDate } } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          total: { $sum: "$total" }
        }
      }
    ]);

    const monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesTrend = [];
    const purchasesTrend = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthNum = d.getMonth() + 1; // 1-12
      const yearNum = d.getFullYear();
      const monthName = monthsList[d.getMonth()];

      const sMatch = salesAgg.find(item => item._id.month === monthNum && item._id.year === yearNum);
      salesTrend.push({
        month: monthName,
        amount: sMatch ? sMatch.total : 0
      });

      const pMatch = purchasesAgg.find(item => item._id.month === monthNum && item._id.year === yearNum);
      purchasesTrend.push({
        month: monthName,
        amount: pMatch ? pMatch.total : 0
      });
    }

    successRes(res, 200, true, "Dashboard overview metrics fetched successfully!", {
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalPurchasesCost,
      totalSalesRevenue,
      lowStockCount,
      recentPurchases,
      recentSales,
      salesTrend,
      purchasesTrend
    })
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  createSupplier,
  getAllSuppliers,
  deleteSupplier,
  updateSupplier,
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  createPurchase,
  getAllPurchases,
  deletePurchase,
  updatePurchase,
  createSale,
  getAllSales,
  deleteSale,
  updateSale,
  getDashboardOverview
}