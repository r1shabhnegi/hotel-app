import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className='pb-10 bg-pink-700'>
      <div className='container flex flex-col gap-2 mx-auto'>
        <h1 className='text-5xl text-white -font-bold'>
          Search Hotels to stay
        </h1>
        <p className='text-2xl text-white'>Best hotels, best price</p>
      </div>
      <div className='container mx-auto mt-8'>
        <SearchBar />
      </div>
    </div>
  );
};
export default Hero;
