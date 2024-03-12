import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "page" }, // Corrected ref value
  user: { type: mongoose.Schema.Types.ObjectId },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: String, required: true },
  price: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  numberOfDays: String,
});

const BookingModel = mongoose.model("booking", bookingSchema);

export default BookingModel;
