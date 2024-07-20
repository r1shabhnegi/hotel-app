"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const hotel_options_config_1 = require("../../config/hotel-options-config");
const TypeSection = () => {
    const { register, formState: { errors }, watch, } = (0, react_hook_form_1.useFormContext)();
    const typeWatch = watch("type");
    return (<div className=''>
      <h2 className='mb-3 text-2xl font-bold'>Type</h2>
      <div className='grid grid-cols-5 gap-2'>
        {hotel_options_config_1.hotelTypes.map((type) => (<label key={type} className={typeWatch === type
                ? "cursor-pointer bg-pink-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"}>
            <input type='radio' value={type} {...register("type", {
            required: "This field is required",
        })} className='hidden'/>
            <span>{type}</span>
          </label>))}
      </div>
      {errors.type && (<span className='text-sm font-bold text-red-500'>
          errors.type.message
        </span>)}
    </div>);
};
exports.default = TypeSection;
