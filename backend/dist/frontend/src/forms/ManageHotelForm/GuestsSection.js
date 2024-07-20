"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const GuestsSection = () => {
    var _a, _b;
    const { register, formState: { errors }, } = (0, react_hook_form_1.useFormContext)();
    return (<div>
      <h2 className='mb-3 text-2xl font-bold'>Guests</h2>
      <div className='grid grid-cols-2 gap-5 p-6 bg-gray-300'>
        <label className='text-sm font-semibold text-gray-700'>
          Adults
          <input type='number' min={1} {...register('adultCount', {
        required: 'This field is required',
    })} className='w-full px-3 py-2 font-normal border rounded'/>
          {errors.adultCount && (<span className='text-sm font-bold text-red-500'>
              {(_a = errors.adultCount) === null || _a === void 0 ? void 0 : _a.message}
            </span>)}
        </label>

        <label className='text-sm font-semibold text-gray-700'>
          Children
          <input type='number' min={0} {...register('childCount', {
        required: 'This field is required',
    })} className='w-full px-3 py-2 font-normal border rounded'/>
          {errors.childCount && (<span className='text-sm font-bold text-red-500'>
              {(_b = errors.childCount) === null || _b === void 0 ? void 0 : _b.message}
            </span>)}
        </label>
      </div>
    </div>);
};
exports.default = GuestsSection;
