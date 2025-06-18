import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  images: [{ type: Array, required: true }],
  slots: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
