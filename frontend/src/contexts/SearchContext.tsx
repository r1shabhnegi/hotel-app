import React, { useContext, useState } from 'react';

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

// Part 1
type SearchContextProviderChildren = {
  children: React.ReactNode;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

// Part 2

export const SearchContextProvider = ({
  children,
}: SearchContextProviderChildren) => {
  const [destination, setDestination] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>('');

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    hotelId && setHotelId(hotelId);
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

// Part 3

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
