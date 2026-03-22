import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  shipping: {
    type: String,
    enum: ["Standard", "Premium", "Expedited"],
    default: "Standard",
  },
  totalPrice: { type: Number, default: 0 },

  firstName: { type: String, required: true, trim: true, maxlength: 40 },
  lastName: { type: String, required: true, trim: true, maxlength: 40 },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{9,15}$/, "Invalid phone number"]
  },
  address: { type: String, required: true, trim: true, maxlength: 300 },
  city: { type: String, trim: true, maxlength: 50 },
  state: { type: String, required: true, trim: true, maxlength: 50 },
  zip: { type: String, required: true, trim: true, maxlength: 50 },
  country: { type: String, required: true, trim: true, maxlength: 50 },

  paymentMethod: {
    type: String,
    enum: ["Credit Card", "QR Code"],
    default: "QR Code",
  },

  status: {
    type: String,
    enum: ["preparing", "inTransit", "delivered", "cancel"],
    default: "preparing",
  },

  products: [{
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
  }],

  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Order = model("Order", OrderSchema);
