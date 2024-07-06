import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelPrice: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Booking = mongoose.model("Booking", bookingSchema);
