"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const AppContext_1 = require("../contexts/AppContext");
const SignOutButton_1 = __importDefault(require("./SignOutButton"));
const Header = () => {
    const { isLoggedIn } = (0, AppContext_1.useAppContext)();
    return (<div className='py-6 bg-pink-700'>
      <div className='container flex justify-between mx-auto'>
        <span className='text-3xl font-bold tracking-tight text-white'>
          <react_router_dom_1.Link to='/'>Hotel Stay</react_router_dom_1.Link>
        </span>
        <span className='flex space-x-2'>
          {isLoggedIn ? (<>
              <react_router_dom_1.Link className='flex items-center px-3 font-bold text-white rounded-full hover:bg-pink-600' to='/my-bookings'>
                My Bookings
              </react_router_dom_1.Link>
              <react_router_dom_1.Link className='flex items-center p-3 font-bold text-white rounded-full hover:bg-pink-600' to='/my-hotels'>
                My Hotels
              </react_router_dom_1.Link>
              <SignOutButton_1.default />
            </>) : (<>
              <react_router_dom_1.Link to='/sign-in' className='flex items-center px-3 font-bold text-pink-600 bg-white rounded-full hover:bg-gray-100 hover:text-green-500'>
                Sign In
              </react_router_dom_1.Link>
            </>)}
        </span>
      </div>
    </div>);
};
exports.default = Header;
