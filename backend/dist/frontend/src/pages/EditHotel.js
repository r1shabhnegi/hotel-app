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
const react_router_dom_1 = require("react-router-dom");
const apiClient = __importStar(require("../api-client"));
const ManageHotelForm_1 = __importDefault(require("../forms/ManageHotelForm/ManageHotelForm"));
const AppContext_1 = require("../contexts/AppContext");
const EditHotel = () => {
    const { showToast } = (0, AppContext_1.useAppContext)();
    const { hotelId } = (0, react_router_dom_1.useParams)();
    const { data: hotel } = (0, react_query_1.useQuery)({
        queryKey: ['fetchMyHotelById'],
        queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
        enabled: !!hotelId,
    });
    const { mutate, isPending } = (0, react_query_1.useMutation)({
        mutationFn: apiClient.updateHotelById,
        onSuccess: () => {
            showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
        },
        onError: () => {
            showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
        },
    });
    const handleSave = (hotelFormData) => {
        mutate(hotelFormData);
    };
    return (<ManageHotelForm_1.default onSave={handleSave} hotel={hotel} isLoading={isPending}/>);
};
exports.default = EditHotel;
