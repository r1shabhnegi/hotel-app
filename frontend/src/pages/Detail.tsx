import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar
              key={Math.round(Math.random() * 10000)}
              className='fill-yellow-400'
            />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {hotel.imageUrls.map((image) => (
          <div
            key={image + Math.round(Math.random() * 1000)}
            className='h-[300px]'>
            <img
              src={image}
              alt={hotel.name}
              className='object-cover object-center w-full h-full rounded-md'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-2 lg:grid-cols-4'>
        {hotel.facilities.map((facility) => (
          <div
            key={facility + Math.round(Math.random() * 1000)}
            className='p-3 border rounded-sm border-slate-300'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
