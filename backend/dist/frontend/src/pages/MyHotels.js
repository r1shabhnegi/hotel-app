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
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const apiClient = __importStar(require("../api-client"));
const AppContext_1 = require("../contexts/AppContext");
const bs_1 = require("react-icons/bs");
const bi_1 = require("react-icons/bi");
const MyHotels = () => {
    const { showToast } = (0, AppContext_1.useAppContext)();
    const { data: hotelData, isError } = (0, react_query_1.useQuery)({
        queryKey: ["fetchMyHotels"],
        queryFn: apiClient.fetchMyHotels,
    });
    if (isError) {
        showToast({ message: "Something went wrong!", type: "ERROR" });
    }
    if (!hotelData) {
        return <span>No hotels found</span>;
    }
    return (<div className='space-y-5 '>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <react_router_dom_1.Link to='/add-hotel' className='flex p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
          Add Hotel
        </react_router_dom_1.Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotelData === null || hotelData === void 0 ? void 0 : hotelData.map((hotel, index) => (<div key={index} className='flex flex-col justify-between gap-5 p-8 border rounded-lg border-slate-300'>
            <h2 className='text-2xl font-bold'>{hotel.name}</h2>
            <div className='whitespace-pre-line'>{hotel.description}</div>
            <div className='grid grid-cols-5 gap-2'>
              <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                <bs_1.BsMap className='mr-1'/>
                {hotel.city}, {hotel.country}
              </div>
              <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                <bs_1.BsBuilding className='mr-1'/>
                {hotel.type}
              </div>
              <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                <bi_1.BiMoney className='mr-1'/>${hotel.pricePerNight} per night
              </div>

              <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                <bi_1.BiHotel className='mr-1'/>
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>

              <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                <bs_1.BsStar className='mr-1'/>
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className='flex justify-end'>
              <react_router_dom_1.Link to={`/edit-hotel/${hotel._id}`} className='flex p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
                View Details
              </react_router_dom_1.Link>
            </span>
          </div>))}
      </div>
    </div>);
};
exports.default = MyHotels;
