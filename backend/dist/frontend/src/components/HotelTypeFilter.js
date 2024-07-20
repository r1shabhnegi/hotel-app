"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_options_config_1 = require("../config/hotel-options-config");
const HotelTypesFilter = ({ selectedHotelTypes, onChange }) => {
    return (<div className='pb-5 border-b border-slate-300'>
      <h4 className='mb-2 font-semibold text-md'>Hotel Type</h4>
      {hotel_options_config_1.hotelTypes.map((hotelType) => (<label key={hotelType + Math.round(Math.random() * 1000)} className='flex items-center space-x-2'>
          <input type='checkbox' className='rounded' value={hotelType} checked={selectedHotelTypes.includes(hotelType)} onChange={onChange}/>
          <span>{hotelType}</span>
        </label>))}
    </div>);
};
exports.default = HotelTypesFilter;
