import { Request, Response, Router } from "express";
import verifyToken from "../middleware/auth";
import { Booking } from "../models/booking";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  const bookings = await Booking.find({ userId });

  res.status(200).send(bookings);
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  console.log(req.body);
  const { hotelName, checkIn, checkOut, imageUrl, hotelPrice } = req.body;
  const userId = req.userId;

  console.log(hotelName, checkIn, checkOut, imageUrl, hotelPrice);

  const createdBooking = await Booking.create({
    userId,
    checkIn,
    checkOut,
    hotelName,
    hotelPrice,
    imageUrl,
  });
  console.log(createdBooking);
  if (!createdBooking) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ message: "done" });
});

export default router;
