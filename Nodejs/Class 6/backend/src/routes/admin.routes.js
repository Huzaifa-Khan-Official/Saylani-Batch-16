import express from "express"
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
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
} from "../controllers/admin.controller.js"

const router = express.Router()

router.route("/dashboard")
  .get(getDashboardOverview)

router.route("/categories")
  .get(getAllCategory)
  .post(createCategory)

router.route("/categories/:id")
  .delete(deleteCategory)
  .put(updateCategory)


router.route("/suppliers")
  .get(getAllSuppliers)
  .post(createSupplier)

router.route("/suppliers/:id")
  .delete(deleteSupplier)
  .put(updateSupplier)


router.route("/products")
  .get(getAllProducts)
  .post(createProduct)

router.route("/products/:id")
  .delete(deleteProduct)
  .put(updateProduct)


router.route("/purchases")
  .get(getAllPurchases)
  .post(createPurchase)

router.route("/purchases/:id")
  .delete(deletePurchase)
  .put(updatePurchase)


router.route("/sales")
  .get(getAllSales)
  .post(createSale)

router.route("/sales/:id")
  .delete(deleteSale)
  .put(updateSale)

export default router