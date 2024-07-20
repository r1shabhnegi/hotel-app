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
const apiClient = __importStar(require("../api-client"));
const LatestDestinationCard_1 = __importDefault(require("../components/LatestDestinationCard"));
const Home = () => {
    const { data: hotels } = (0, react_query_1.useQuery)({
        queryKey: ["fetchQuery"],
        queryFn: () => apiClient.fetchHotels(),
    });
    const topRowHotels = (hotels === null || hotels === void 0 ? void 0 : hotels.slice(0, 2)) || [];
    const bottomRowHotels = (hotels === null || hotels === void 0 ? void 0 : hotels.slice(2)) || [];
    return (<div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className='grid gap-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {topRowHotels.map((hotel) => (<LatestDestinationCard_1.default hotel={hotel}/>))}
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          {bottomRowHotels.map((hotel) => (<LatestDestinationCard_1.default hotel={hotel}/>))}
        </div>
      </div>
    </div>);
};
exports.default = Home;
