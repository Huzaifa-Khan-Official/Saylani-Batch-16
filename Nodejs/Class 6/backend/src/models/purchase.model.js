import mongoose from 'mongoose';

const {Schema, model} = mongoose

const purchaseSchema = new Schema({
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
      trim: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = model('Purchase', purchaseSchema);

export default Purchase