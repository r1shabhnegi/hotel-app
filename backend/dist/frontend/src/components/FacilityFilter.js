"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_options_config_1 = require("../config/hotel-options-config");
const FacilitiesFilter = ({ selectedFacilities, onChange }) => {
    return (<div className='pb-5 border-b border-slate-300'>
      <h4 className='mb-2 font-semibold text-md'>Facilities</h4>
      {hotel_options_config_1.hotelFacilities.map((facility) => (<label key={facility + Math.round(Math.random() * 1000)} className='flex items-center space-x-2'>
          <input type='checkbox' className='rounded' value={facility} checked={selectedFacilities.includes(facility)} onChange={onChange}/>
          <span>{facility}</span>
        </label>))}
    </div>);
};
exports.default = FacilitiesFilter;
