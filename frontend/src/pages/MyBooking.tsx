import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
const MyBooking = () => {
  const { data, isPending } = useQuery({
    queryKey: ["myBookings"],
    queryFn: apiClient.getBookings,
  });

  console.log(data);
  if (isPending) return <></>;
  return (
    <div className='px-5'>
      {data?.map(
        (booking: {
          checkIn: string;
          _id: string;
          checkOut: string;
          imageUrl: string;
          hotelName: string;
        }) => {
          const formattedDate = (date: string) => {
            const newDate = new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return newDate;
          };

          const checkInDate = formattedDate(booking.checkIn);
          const checkOutDate = formattedDate(booking.checkOut);

          return (
            <div
              key={booking._id}
              className='flex flex-col items-center justify-center gap-20 py-20 rounded-lg mx- sm:border lg:flex-row'>
              <div className='w-full sm:w-[20rem]'>
                <img
                  src={booking.imageUrl}
                  className='object-cover'
                  alt=''
                />
              </div>
              <div className='lg:w-[20rem]  flex flex-col  gap-10'>
                <h1 className='text-6xl font-semibold'>{booking.hotelName}</h1>
                <div className='flex gap-10 flex-co sm:flex-row'>
                  <p className='flex flex-col items-center justify-center p-2 border rounded-md'>
                    <span className='font-semibold'>Check in</span>
                    {checkInDate}
                  </p>
                  <p className='flex flex-col items-center justify-center p-2 border rounded-md'>
                    <span className='font-semibold'>Check out</span>
                    {checkOutDate}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default MyBooking;
