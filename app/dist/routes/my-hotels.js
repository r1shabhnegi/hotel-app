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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_1 = require("../models/hotel");
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
});
// api/my-hotels
router.post('/', auth_1.default, [
    (0, express_validator_1.body)('name').notEmpty().isString().withMessage('Name is required'),
    (0, express_validator_1.body)('city').notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('country').notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('type').notEmpty().withMessage('Hotel type is required'),
    (0, express_validator_1.body)('pricePerNight')
        .notEmpty()
        .isNumeric()
        .withMessage('Price per night is required and must be a number'),
    (0, express_validator_1.body)('facilities')
        .notEmpty()
        .isArray()
        .withMessage('Facilities are required'),
], upload.array('imageFiles', 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // 1.upload the images to cloudinary
        const imageUrls = yield uploadImages(imageFiles);
        // 2. if upload successful, add the URLS to the new hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        // 3. save the new hotel in our directory
        const hotel = new hotel_1.Hotel(newHotel);
        if (!hotel) {
            console.log('hotel db error');
        }
        yield hotel.save();
        // 4.return a 201 status
        res.status(201).send(hotel);
    }
    catch (error) {
        console.log('Error creating hotel: ', error);
        res.status(500).json({ message: error });
    }
}));
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotel_1.Hotel.find({ userId: req.userId });
        res.json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
}));
router.get('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // /api/my-hotels/234525455256
    const id = req.params.id.toString();
    try {
        const hotel = yield hotel_1.Hotel.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
}));
router.put('/:hotelId', auth_1.default, upload.array('imageFiles'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = yield hotel_1.Hotel.findByIdAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];
        yield hotel.save();
        res.status(201).json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        return imageUrls;
    });
}
exports.default = router;
