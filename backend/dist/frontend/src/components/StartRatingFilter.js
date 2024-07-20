"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StarRatingFilter = ({ selectedStars, onChange }) => {
    return (<div className='pb-5 border-b border-slate-300'>
      <h4 className='mb-2 font-semibold text-md'>Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (<label key={star + Math.round(Math.random() * 9000)} className='flex items-center space-x-2'>
          <input type='checkbox' className='rounded' value={star} checked={selectedStars.includes(star)} onChange={onChange}/>
          <span>{star} Stars</span>
        </label>))}
    </div>);
};
exports.default = StarRatingFilter;
