"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const LatestDestinationCard = ({ hotel }) => {
    return (<react_router_dom_1.Link to={`/detail/${hotel._id}`} className='relative overflow-hidden rounded-md cursor-pointer'>
      <div className='h-[300px]'>
        <img src={hotel.imageUrls[0]} className='object-cover object-center w-full h-full'/>
      </div>

      <div className='absolute bottom-0 w-full p-4 bg-black bg-opacity-35 rounded-b-md'>
        <span className='text-3xl font-bold tracking-tight text-white'>
          {hotel.name}
        </span>
      </div>
    </react_router_dom_1.Link>);
};
exports.default = LatestDestinationCard;
