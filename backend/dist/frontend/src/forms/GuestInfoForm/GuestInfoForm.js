"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const SearchContext_1 = require("../../contexts/SearchContext");
const AppContext_1 = require("../../contexts/AppContext");
const react_router_dom_1 = require("react-router-dom");
const GuestInfoForm = ({ hotelId, pricePerNight }) => {
    const search = (0, SearchContext_1.useSearchContext)();
    const { isLoggedIn } = (0, AppContext_1.useAppContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const { watch, register, handleSubmit, setValue, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const onSignInClick = (data) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/sign-in", { state: { from: location } });
    };
    const onSubmit = (data) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    };
    return (<div className='flex flex-col gap-4 p-4 bg-pink-200'>
      <h3 className='font-bold text-md'>£{pricePerNight}</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className='grid items-center grid-cols-1 gap-4'>
          <div>
            <react_datepicker_1.default required selected={checkIn} onChange={(date) => setValue("checkIn", date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText='Check-in Date' className='min-w-full p-2 bg-white focus:outline-none' wrapperClassName='min-w-full'/>
          </div>
          <div>
            <react_datepicker_1.default required selected={checkOut} onChange={(date) => setValue("checkOut", date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText='Check-in Date' className='min-w-full p-2 bg-white focus:outline-none' wrapperClassName='min-w-full'/>
          </div>
          <div className='flex gap-2 px-2 py-1 bg-white'>
            <label className='flex items-center'>
              Adults:
              <input className='w-full p-1 font-bold focus:outline-none' type='number' min={1} max={20} {...register("adultCount", {
        required: "This field is required",
        min: {
            value: 1,
            message: "There must be at least one adult",
        },
        valueAsNumber: true,
    })}/>
            </label>
            <label className='flex items-center'>
              Children:
              <input className='w-full p-1 font-bold focus:outline-none' type='number' min={0} max={20} {...register("childCount", {
        valueAsNumber: true,
    })}/>
            </label>
            {errors.adultCount && (<span className='text-sm font-semibold text-red-500'>
                {errors.adultCount.message}
              </span>)}
          </div>
          {isLoggedIn ? (<button className='h-full p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
              Book Now
            </button>) : (<button className='h-full p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
              Sign in to Book
            </button>)}
        </div>
      </form>
    </div>);
};
exports.default = GuestInfoForm;
