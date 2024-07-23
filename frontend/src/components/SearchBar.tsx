import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className='grid items-center grid-cols-1 gap-4 px-2 sm:grid-cols-2 bg-orange-40 p- lg:grid-cols-3 2xl:grid-cols-5'>
      <div className='flex flex-row items-center flex-1 p-2 bg-white rounded-lg '>
        <MdTravelExplore
          size={25}
          className='mr-2'
        />
        <input
          placeholder='Where are you going, (Eg.- Delhi)'
          className='w-full text-sm sm:text-md focus:outline-none placeholder:text-gray-700'
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className='flex gap-2 px-2 py-1 bg-white rounded-lg'>
        <label className='flex items-center '>
          Adults:
          <input
            className='w-full p-1 text-sm font-bold sm:text-md focus:outline-none'
            type='number'
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className='flex items-center '>
          Children:
          <input
            className='w-full p-1 text-sm font-bold sm:text-md focus:outline-none'
            type='number'
            min={1}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className=''>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='check-in Date'
          className='w-full p-2 text-sm bg-white rounded-lg sm:text-md sm:min-w-min focus:outline-none'
          wrapperClassName='min-w-full'
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='check-in Date'
          className='w-full p-2 text-sm bg-white rounded-lg sm:text-md sm:min-w-min focus:outline-none'
          wrapperClassName='min-w-full'
        />
      </div>

      <div className='flex gap-1'>
        <button className='w-2/3 h-full p-2 text-xl font-bold text-white bg-gray-500 rounded-lg hover:bg-gray-400'>
          Search
        </button>
        <button className='w-1/3 h-full p-2 text-xl font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500'>
          Clear
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
