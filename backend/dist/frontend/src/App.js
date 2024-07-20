"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./layouts/Layout"));
const Register_1 = __importDefault(require("./pages/Register"));
const SignIn_1 = __importDefault(require("./pages/SignIn"));
const Home_1 = __importDefault(require("./pages/Home"));
const AddHotel_1 = __importDefault(require("./pages/AddHotel"));
const AppContext_1 = require("./contexts/AppContext");
const MyHotels_1 = __importDefault(require("./pages/MyHotels"));
const EditHotel_1 = __importDefault(require("./pages/EditHotel"));
const Search_1 = __importDefault(require("./pages/Search"));
const Detail_1 = __importDefault(require("./pages/Detail"));
const Booking_1 = __importDefault(require("./pages/Booking"));
const MyBooking_1 = __importDefault(require("./pages/MyBooking"));
function App() {
    const { isLoggedIn } = (0, AppContext_1.useAppContext)();
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<Layout_1.default>{<Home_1.default />}</Layout_1.default>}/>
        <react_router_dom_1.Route path='/search' element={<Layout_1.default>
              <Search_1.default />
            </Layout_1.default>}/>
        <react_router_dom_1.Route path='/detail/:hotelId' element={<Layout_1.default>
              <Detail_1.default />
            </Layout_1.default>}/>
        <react_router_dom_1.Route path='/register' element={<Layout_1.default>
              <Register_1.default />
            </Layout_1.default>}/>
        <react_router_dom_1.Route path='/sign-in' element={<Layout_1.default>
              <SignIn_1.default />
            </Layout_1.default>}/>

        {isLoggedIn && (<>
            <react_router_dom_1.Route path='/add-hotel' element={<Layout_1.default>
                  <AddHotel_1.default />
                </Layout_1.default>}/>
            <react_router_dom_1.Route path='/hotel/:hotelId/booking' element={<Layout_1.default>
                  <Booking_1.default />
                </Layout_1.default>}/>

            <react_router_dom_1.Route path='/my-hotels' element={<Layout_1.default>
                  <MyHotels_1.default />
                </Layout_1.default>}/>
            <react_router_dom_1.Route path='/edit-hotel/:hotelId' element={<Layout_1.default>
                  <EditHotel_1.default />
                </Layout_1.default>}/>
            <react_router_dom_1.Route path='/my-bookings' element={<Layout_1.default>
                  <MyBooking_1.default />
                </Layout_1.default>}/>
          </>)}

        <react_router_dom_1.Route path='*' element={<react_router_dom_1.Navigate to='/'/>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
