"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceFilter = ({ selectedPrice, onChange }) => {
    return (<div>
      <h4 className='mb-2 font-semibold text-md'> Max Price</h4>
      <select className='w-full p-2 border rounded-md' value={selectedPrice} onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
        <option value=''>Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (<option key={price} value={price}>
            {price}
          </option>))}
      </select>
    </div>);
};
exports.default = PriceFilter;
