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
const react_hook_form_1 = require("react-hook-form");
const SearchContext_1 = require("../../contexts/SearchContext");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const apiClient = __importStar(require("../../api-client"));
const AppContext_1 = require("../../contexts/AppContext");
const BookingForm = ({ currentUser, totalCost, hotelName, imageUrl, }) => {
    const { showToast } = (0, AppContext_1.useAppContext)();
    const search = (0, SearchContext_1.useSearchContext)();
    const { hotelId } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { mutateAsync } = (0, react_query_1.useMutation)({
        mutationFn: apiClient.createBooking,
        onSuccess: () => {
            showToast({ message: "Hotel Booked Successfully", type: "SUCCESS" });
            navigate("/");
        },
        onError: () => {
            showToast({ message: "Error Booking Hotel", type: "ERROR" });
        },
    });
    const onSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log({
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelPrice: totalCost,
            hotelName,
            imageUrl,
        });
        yield mutateAsync({
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelPrice: totalCost,
            hotelName,
            imageUrl,
        });
    });
    const { handleSubmit, register } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost,
        },
    });
    return (<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5 p-5 border rounded-lg border-slate-300'>
      <span className='text-3xl font-bold'>Confirm Your Details</span>
      <div className='grid grid-cols-2 gap-6'>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          First Name
          <input className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded' type='text' readOnly disabled {...register("firstName")}/>
        </label>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          Last Name
          <input className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded' type='text' readOnly disabled {...register("lastName")}/>
        </label>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          Email
          <input className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded' type='text' readOnly disabled {...register("email")}/>
        </label>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Your Price Summary</h2>

        <div className='p-4 bg-pink-200 rounded-md'>
          <div className='text-lg font-semibold'>
            Total Cost: £{totalCost.toFixed(2)}
          </div>
          <div className='text-xs'>Includes taxes and charges</div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-xl font-semibold'> Payment Details</h3>
      </div>

      <div className='flex justify-end'>
        <button type='submit' className='p-2 font-bold text-white bg-pink-600 hover:bg-pink-500 text-md disabled:bg-gray-500'>
          Confirm Booking
        </button>
      </div>
    </form>);
};
exports.default = BookingForm;
