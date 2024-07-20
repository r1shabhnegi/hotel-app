"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchContext = exports.SearchContextProvider = void 0;
const react_1 = __importStar(require("react"));
const SearchContext = react_1.default.createContext(undefined);
const SearchContextProvider = ({ children, }) => {
    const [destination, setDestination] = (0, react_1.useState)(() => sessionStorage.getItem("destination") || "");
    const [checkIn, setCheckIn] = (0, react_1.useState)(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOut] = (0, react_1.useState)(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultCount, setAdultCount] = (0, react_1.useState)(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount, setChildCount] = (0, react_1.useState)(() => parseInt(sessionStorage.getItem("childCount") || "1"));
    const [hotelId, setHotelId] = (0, react_1.useState)(() => sessionStorage.getItem("hotelID") || "");
    const saveSearchValues = (destination, checkIn, checkOut, adultCount, childCount, hotelId) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultCount", adultCount.toString());
        sessionStorage.setItem("childCount", childCount.toString());
        if (hotelId) {
            sessionStorage.setItem("hotelId", hotelId);
        }
    };
    return (<SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            hotelId,
            saveSearchValues,
        }}>
      {children}
    </SearchContext.Provider>);
};
exports.SearchContextProvider = SearchContextProvider;
const useSearchContext = () => {
    const context = (0, react_1.useContext)(SearchContext);
    return context;
};
exports.useSearchContext = useSearchContext;
