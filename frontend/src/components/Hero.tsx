import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className='px-2 pb-10 bg-pink-700'>
      <div className='container flex flex-col gap-2 mx-auto'>
        <h1 className='text-2xl text-white sm:text-3xl md:text-5xl -font-bold'>
          Search Hotels to stay
        </h1>
        <p className='text-lg text-white sm:text-xl md:text-2xl'>
          Best hotels, best price
        </p>
      </div>
      <div className='container mx-auto mt-8'>
        <SearchBar />
      </div>
    </div>
  );
};
export default Hero;
