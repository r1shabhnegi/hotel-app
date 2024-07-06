const Footer = () => {
  return (
    <div className='py-10 bg-pink-700'>
      <div className='container flex items-center justify-between mx-auto'>
        <span className='text-3xl font-bold tracking-tight text-white'>
          MernHolidays.com
        </span>
        <span className='flex gap-4 font-bold tracking-tight text-white'>
          <p className='cursor-pointer'>Privacy policy</p>
          <p className='cursor-pointer'>Terms of service</p>
        </span>
      </div>
    </div>
  );
};
export default Footer;
