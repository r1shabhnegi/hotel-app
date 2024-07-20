"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("@tanstack/react-query");
const SearchContext_1 = require("../contexts/SearchContext");
const apiClient = __importStar(require("../api-client"));
const react_1 = require("react");
const SearchResultsCard_1 = __importDefault(require("../components/SearchResultsCard"));
const Pagination_1 = __importDefault(require("../components/Pagination"));
const StartRatingFilter_1 = __importDefault(require("../components/StartRatingFilter"));
const HotelTypeFilter_1 = __importDefault(require("../components/HotelTypeFilter"));
const FacilityFilter_1 = __importDefault(require("../components/FacilityFilter"));
const PriceFilter_1 = __importDefault(require("../components/PriceFilter"));
const Search = () => {
    const search = (0, SearchContext_1.useSearchContext)();
    const [page, setPage] = (0, react_1.useState)(1);
    const [selectedStars, setSelectedStars] = (0, react_1.useState)([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = (0, react_1.useState)([]);
    const [selectedFacilities, setSelectedFacilities] = (0, react_1.useState)([]);
    const [selectedPrice, setSelectedPrice] = (0, react_1.useState)();
    const [sortOption, setSortOption] = (0, react_1.useState)("");
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice === null || selectedPrice === void 0 ? void 0 : selectedPrice.toString(),
        sortOption,
    };
    const { data: hotelData } = (0, react_query_1.useQuery)({
        queryKey: ["searchHotels", searchParams],
        queryFn: () => apiClient.searchHotels(searchParams),
    });
    const handleStarsChange = (event) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) => event.target.checked
            ? [...prevStars, starRating]
            : prevStars.filter((star) => star !== starRating));
    };
    const handleHotelTypeChange = (event) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prevHotelTypes) => event.target.checked
            ? [...prevHotelTypes, hotelType]
            : prevHotelTypes.filter((hotel) => hotel !== hotelType));
    };
    const handleFacilityChange = (event) => {
        const facility = event.target.value;
        setSelectedFacilities((prevFacilities) => event.target.checked
            ? [...prevFacilities, facility]
            : prevFacilities.filter((prevFacility) => prevFacility !== facility));
    };
    return (<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='sticky p-5 border rounded-lg border-slate-300 h-fit top-10'>
        <div className='space-y-5'>
          <h3 className='pb-5 text-lg font-semibold border-b border-slate-300'>
            Filter by:
          </h3>
          <StartRatingFilter_1.default selectedStars={selectedStars} onChange={handleStarsChange}/>
          <HotelTypeFilter_1.default selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <FacilityFilter_1.default selectedFacilities={selectedFacilities} onChange={handleFacilityChange}/>
          <PriceFilter_1.default selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)}/>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold'>
            {hotelData === null || hotelData === void 0 ? void 0 : hotelData.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className='p-2 border rounded-md'>
            <option value=''>Sort By</option>
            <option value='starRating'>Star Rating</option>
            <option value='pricePerNightAsc'>
              Price Per Night (low to high)
            </option>
            <option value='pricePerNightDesc'>
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData === null || hotelData === void 0 ? void 0 : hotelData.data.map((hotel) => (<SearchResultsCard_1.default hotel={hotel} key={hotel._id}/>))}
        <div>
          <Pagination_1.default page={(hotelData === null || hotelData === void 0 ? void 0 : hotelData.pagination.page) || 1} pages={(hotelData === null || hotelData === void 0 ? void 0 : hotelData.pagination.pages) || 1} onPageChange={(page) => setPage(page)}/>
        </div>
      </div>
    </div>);
};
exports.default = Search;
