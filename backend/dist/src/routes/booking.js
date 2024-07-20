"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const booking_1 = require("../models/booking");
const router = (0, express_1.Router)();
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const bookings = yield booking_1.Booking.find({ userId });
    res.status(200).send(bookings);
}));
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { hotelName, checkIn, checkOut, imageUrl, hotelPrice } = req.body;
    const userId = req.userId;
    console.log(hotelName, checkIn, checkOut, imageUrl, hotelPrice);
    const createdBooking = yield booking_1.Booking.create({
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
}));
exports.default = router;
