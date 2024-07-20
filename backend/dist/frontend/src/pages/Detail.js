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
const react_router_dom_1 = require("react-router-dom");
const apiClient = __importStar(require("../api-client"));
const ai_1 = require("react-icons/ai");
const GuestInfoForm_1 = __importDefault(require("../forms/GuestInfoForm/GuestInfoForm"));
const Detail = () => {
    const { hotelId } = (0, react_router_dom_1.useParams)();
    const { data: hotel } = (0, react_query_1.useQuery)({
        queryKey: ["fetchHotelById"],
        queryFn: () => apiClient.fetchHotelById(hotelId || ""),
        enabled: !!hotelId,
    });
    if (!hotel) {
        return <></>;
    }
    return (<div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map(() => (<ai_1.AiFillStar key={Math.round(Math.random() * 10000)} className='fill-yellow-400'/>))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {hotel.imageUrls.map((image) => (<div key={image + Math.round(Math.random() * 1000)} className='h-[300px]'>
            <img src={image} alt={hotel.name} className='object-cover object-center w-full h-full rounded-md'/>
          </div>))}
      </div>

      <div className='grid grid-cols-1 gap-2 lg:grid-cols-4'>
        {hotel.facilities.map((facility) => (<div key={facility + Math.round(Math.random() * 1000)} className='p-3 border rounded-sm border-slate-300'>
            {facility}
          </div>))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm_1.default pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
        </div>
      </div>
    </div>);
};
exports.default = Detail;
