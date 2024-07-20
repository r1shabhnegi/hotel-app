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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = exports.createBooking = exports.fetchCurrentUser = exports.fetchHotelById = exports.fetchHotels = exports.searchHotels = exports.updateHotelById = exports.fetchMyHotelById = exports.fetchMyHotels = exports.addMyHotel = exports.signOut = exports.signIn = exports.validateToken = exports.register = void 0;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const register = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const responseBody = yield response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
});
exports.register = register;
const validateToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Token invalid");
    }
    return response.json();
});
exports.validateToken = validateToken;
const signIn = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const body = yield response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
});
exports.signIn = signIn;
const signOut = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Error during sign out");
    }
});
exports.signOut = signOut;
const addMyHotel = (hotelFormData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(hotelFormData);
    const response = yield fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });
    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }
    return response.json();
});
exports.addMyHotel = addMyHotel;
const fetchMyHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }
    return response.json();
});
exports.fetchMyHotels = fetchMyHotels;
const fetchMyHotelById = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }
    return response.json();
});
exports.fetchMyHotelById = fetchMyHotelById;
const updateHotelById = (hotelFormData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get(`hotelId`)}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
    });
    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }
    return response.json();
});
exports.updateHotelById = updateHotelById;
const searchHotels = (searchParams) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
    (_a = searchParams.facilities) === null || _a === void 0 ? void 0 : _a.forEach((facility) => queryParams.append("facilities", facility));
    (_b = searchParams.types) === null || _b === void 0 ? void 0 : _b.forEach((type) => queryParams.append("types", type));
    (_c = searchParams.stars) === null || _c === void 0 ? void 0 : _c.forEach((star) => queryParams.append("stars", star));
    const response = yield fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }
    return response.json();
});
exports.searchHotels = searchHotels;
const fetchHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }
    return response.json();
});
exports.fetchHotels = fetchHotels;
const fetchHotelById = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }
    return response.json();
});
exports.fetchHotelById = fetchHotelById;
const fetchCurrentUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching user");
    }
    return response.json();
});
exports.fetchCurrentUser = fetchCurrentUser;
const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/booking`, {
        method: "POST",
        credentials: "include",
        // body: data,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }
    return response.json();
});
exports.createBooking = createBooking;
const getBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_BASE_URL}/api/booking`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching user");
    }
    return response.json();
});
exports.getBookings = getBookings;
