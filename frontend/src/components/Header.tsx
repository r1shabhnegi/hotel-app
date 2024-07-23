import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='px-2 py-6 bg-pink-700'>
      <div className='container flex flex-col justify-between gap-4 mx-auto sm:flex-row'>
        <span className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>
          <Link to='/'>Hotel Stay</Link>
        </span>
        <span className='flex space-x-2 justify-evenly'>
          {isLoggedIn ? (
            <>
              <Link
                className='flex items-center text-base font-bold text-white rounded-full text-nowrap sm:px-3 hover:bg-pink-600'
                to='/my-bookings'>
                My Bookings
              </Link>
              <Link
                className='flex items-center text-base font-bold text-white rounded-full text-nowrap sm:px-3 hover:bg-pink-600'
                to='/my-hotels'>
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to='/sign-in'
                className='flex items-center px-2 text-base font-bold text-pink-600 bg-white rounded-full text-nowrap sm:px-3 hover:bg-gray-100 hover:text-green-500'>
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
