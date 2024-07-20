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
const apiClient = __importStar(require("../api-client"));
const MyBooking = () => {
    const { data, isPending } = (0, react_query_1.useQuery)({
        queryKey: ["myBookings"],
        queryFn: apiClient.getBookings,
    });
    console.log(data);
    if (isPending)
        return <></>;
    return (<div className='px-20'>
      {data === null || data === void 0 ? void 0 : data.map((booking) => {
            const formattedDate = (date) => {
                const newDate = new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                return newDate;
            };
            const checkInDate = formattedDate(booking.checkIn);
            const checkOutDate = formattedDate(booking.checkOut);
            return (<div key={booking._id} className='flex items-center justify-center gap-20 px-10 py-20 mx-20 border rounded-lg'>
              <div className='w-[20rem]'>
                <img src={booking.imageUrl} className='object-cover' alt=''/>
              </div>
              <div className='w-[20rem] flex flex-col gap-10'>
                <h1 className='text-6xl font-semibold'>{booking.hotelName}</h1>
                <div className='flex gap-10'>
                  <p className='flex flex-col items-center justify-center p-2 border rounded-md'>
                    <span className='font-semibold'>Check in</span>{" "}
                    {checkInDate}
                  </p>
                  <p className='flex flex-col items-center justify-center border rounded-md'>
                    <span className='font-semibold'>Check out</span>{" "}
                    {checkOutDate}
                  </p>
                </div>
              </div>
            </div>);
        })}
    </div>);
};
exports.default = MyBooking;
