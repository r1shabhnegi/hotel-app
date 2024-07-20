"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const hotel_options_config_1 = require("../../config/hotel-options-config");
const FacilitiesSection = () => {
    const { register, formState: { errors }, } = (0, react_hook_form_1.useFormContext)();
    return (<div className=''>
      <h2 className='mb-3 text-2xl font-bold'>Facilities</h2>
      <div className='grid grid-cols-5 gap-3'>
        {hotel_options_config_1.hotelFacilities.map((facility) => (<label key={facility} className='flex gap-1 text-sm text-gray-700'>
            <input type='checkbox' value={facility} {...register('facilities', {
            validate: (facilities) => {
                if (facilities && facilities.length > 0) {
                    return true;
                }
                else {
                    return 'At least one facility is required';
                }
            },
        })}/>
            {facility}
          </label>))}
      </div>
      {errors.facilities && (<span className='text-sm font-bold text-red-500'>
          {errors.facilities.message}
        </span>)}
    </div>);
};
exports.default = FacilitiesSection;
