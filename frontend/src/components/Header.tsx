import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='py-6 bg-pink-700'>
      <div className='container flex justify-between mx-auto'>
        <span className='text-3xl font-bold tracking-tight text-white'>
          <Link to='/'>Hotel Stay</Link>
        </span>
        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <>
              <Link
                className='flex items-center px-3 font-bold text-white rounded-full hover:bg-pink-600'
                to='/my-bookings'>
                My Bookings
              </Link>
              <Link
                className='flex items-center p-3 font-bold text-white rounded-full hover:bg-pink-600'
                to='/my-hotels'>
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to='/sign-in'
                className='flex items-center px-3 font-bold text-pink-600 bg-white rounded-full hover:bg-gray-100 hover:text-green-500'>
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
