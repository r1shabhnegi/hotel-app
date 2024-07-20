import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8'>
      <div className='w-full h-[300px]'>
        <img
          src={hotel.imageUrls[0]}
          className='object-cover object-center w-full h-full'
        />
      </div>

      <div className='grid grid-rows-[1fr_2fr_3fr] '>
        <div>
          <div className='flex items-center'>
            <span className='flex'>
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar
                  key={Math.round(Math.random() * 10000)}
                  className='fill-yellow-400'
                />
              ))}
            </span>
            <span className='ml-1 text-sm'>{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className='text-2xl font-bold cursor-pointer'>
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className='line-clamp-4'>{hotel.description}</div>
        </div>

        <div className='grid items-end grid-cols-2 whitespace-nowrap'>
          <div className='flex items-center gap-1'>
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility + Math.round(Math.random() * 1000)}
                className='p-2 text-xs font-bold rounded-lg bg-slate-300 whitespace-nowrap'>
                {facility}
              </span>
            ))}
            <span className='text-sm'>
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <span className='font-bold'>${hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel._id}`}
              className='h-full p-2 text-xl font-bold text-white bg-pink-600 max-w-fit hover:bg-pink-500'>
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsCard;
