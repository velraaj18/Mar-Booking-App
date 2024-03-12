import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  checkintime: String,
  checkouttime: String,
  perks: [String],
  extrainfo: String,
  guests: String,
  price: String,
});

const PageModel = mongoose.model("page", PageSchema);
export default PageModel;
