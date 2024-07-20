import { useForm } from "react-hook-form";
import { UserType } from "../../shared/types";

import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  totalCost: number;
  hotelName: string;
  imageUrl: string;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({
  currentUser,
  totalCost,
  hotelName,
  imageUrl,
}: Props) => {
  const { showToast } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: apiClient.createBooking,
    onSuccess: () => {
      showToast({ message: "Hotel Booked Successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: () => {
      showToast({ message: "Error Booking Hotel", type: "ERROR" });
    },
  });

  const onSubmit = async () => {
    console.log({
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelPrice: totalCost,
      hotelName,
      imageUrl,
    });
    await mutateAsync({
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelPrice: totalCost,
      hotelName,
      imageUrl,
    });
  };

  const { handleSubmit, register } = useForm<BookingFormData>({
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-5 p-5 border rounded-lg border-slate-300'>
      <span className='text-3xl font-bold'>Confirm Your Details</span>
      <div className='grid grid-cols-2 gap-6'>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          First Name
          <input
            className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded'
            type='text'
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          Last Name
          <input
            className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded'
            type='text'
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          Email
          <input
            className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded'
            type='text'
            readOnly
            disabled
            {...register("email")}
          />
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
        <button
          type='submit'
          className='p-2 font-bold text-white bg-pink-600 hover:bg-pink-500 text-md disabled:bg-gray-500'>
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
