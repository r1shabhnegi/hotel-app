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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("@tanstack/react-query");
const apiClient = __importStar(require("../api-client"));
const BookingForm_1 = __importDefault(require("../forms/BookingForm/BookingForm"));
const SearchContext_1 = require("../contexts/SearchContext");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const BookingDetailsSummary_1 = __importDefault(require("../components/BookingDetailsSummary"));
const Booking = () => {
    const search = (0, SearchContext_1.useSearchContext)();
    const { hotelId } = (0, react_router_dom_1.useParams)();
    const [numberOfNights, setNumberOfNights] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);
    const { data: hotel } = (0, react_query_1.useQuery)({
        queryKey: ["fetchHotelByID"],
        queryFn: () => apiClient.fetchHotelById(hotelId),
        enabled: !!hotelId,
    });
    const { data: currentUser } = (0, react_query_1.useQuery)({
        queryKey: ["fetchCurrentUser"],
        queryFn: apiClient.fetchCurrentUser,
    });
    if (!hotel) {
        return <></>;
    }
    return (<div className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailsSummary_1.default checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel}/>
      {currentUser && (<BookingForm_1.default currentUser={currentUser} totalCost={hotel.pricePerNight} hotelName={hotel.name} imageUrl={hotel.imageUrls[0]}/>)}
    </div>);
};
exports.default = Booking;
