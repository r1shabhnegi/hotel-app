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
const ManageHotelForm_1 = __importDefault(require("../forms/ManageHotelForm/ManageHotelForm"));
const AppContext_1 = require("../contexts/AppContext");
const apiClient = __importStar(require("../api-client"));
const AddHotel = () => {
    const { showToast } = (0, AppContext_1.useAppContext)();
    const { mutate, isPending } = (0, react_query_1.useMutation)({
        mutationFn: apiClient.addMyHotel,
        onSuccess: () => {
            showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
        },
        onError: () => {
            showToast({ message: 'Error saving hotel', type: 'ERROR' });
        },
    });
    const handleSave = (hotelFormData) => {
        console.log('handleSave');
        mutate(hotelFormData);
    };
    return (<ManageHotelForm_1.default onSave={handleSave} isLoading={isPending}/>);
};
exports.default = AddHotel;
