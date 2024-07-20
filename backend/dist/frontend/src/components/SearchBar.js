"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SearchContext_1 = require("../contexts/SearchContext");
const md_1 = require("react-icons/md");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
const react_router_dom_1 = require("react-router-dom");
const SearchBar = () => {
    const search = (0, SearchContext_1.useSearchContext)();
    const [destination, setDestination] = (0, react_1.useState)(search.destination);
    const [checkIn, setCheckIn] = (0, react_1.useState)(search.checkIn);
    const [checkOut, setCheckOut] = (0, react_1.useState)(search.checkOut);
    const [adultCount, setAdultCount] = (0, react_1.useState)(search.adultCount);
    const [childCount, setChildCount] = (0, react_1.useState)(search.childCount);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (event) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    };
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return (<form onSubmit={handleSubmit} className='grid items-center grid-cols-2 gap-4 bg-orange-40 p- lg:grid-cols-3 2xl:grid-cols-5'>
      <div className='flex flex-row items-center flex-1 p-2 bg-white rounded-lg '>
        <md_1.MdTravelExplore size={25} className='mr-2'/>
        <input placeholder='Where are you going' className='w-full text-md focus:outline-none ' value={destination} onChange={(event) => setDestination(event.target.value)}/>
      </div>

      <div className='flex gap-2 px-2 py-1 bg-white rounded-lg'>
        <label className='flex items-center '>
          Adults:
          <input className='w-full p-1 font-bold focus:outline-none' type='number' min={1} max={20} value={adultCount} onChange={(event) => setAdultCount(parseInt(event.target.value))}/>
        </label>
        <label className='flex items-center '>
          Children:
          <input className='w-full p-1 font-bold focus:outline-none' type='number' min={1} max={20} value={childCount} onChange={(event) => setChildCount(parseInt(event.target.value))}/>
        </label>
      </div>
      <div className=''>
        <react_datepicker_1.default selected={checkIn} onChange={(date) => setCheckIn(date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText='check-in Date' className='min-w-full p-2 bg-white rounded-lg focus:outline-none' wrapperClassName='min-w-full'/>
      </div>
      <div>
        <react_datepicker_1.default selected={checkOut} onChange={(date) => setCheckOut(date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText='check-in Date' className='min-w-full p-2 bg-white rounded-lg focus:outline-none' wrapperClassName='min-w-full'/>
      </div>

      <div className='flex gap-1'>
        <button className='w-2/3 h-full p-2 text-xl font-bold text-white bg-gray-500 rounded-lg hover:bg-gray-400'>
          Search
        </button>
        <button className='w-1/3 h-full p-2 text-xl font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500'>
          Clear
        </button>
      </div>
    </form>);
};
exports.default = SearchBar;
