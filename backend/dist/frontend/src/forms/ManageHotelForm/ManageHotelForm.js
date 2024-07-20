"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const DetailsSection_1 = __importDefault(require("./DetailsSection"));
const TypeSection_1 = __importDefault(require("./TypeSection"));
const FacilitiesSection_1 = __importDefault(require("./FacilitiesSection"));
const GuestsSection_1 = __importDefault(require("./GuestsSection"));
const ImagesSection_1 = __importDefault(require("./ImagesSection"));
const react_1 = require("react");
const ManageHotelForm = ({ onSave, isLoading, hotel }) => {
    const formMethods = (0, react_hook_form_1.useForm)();
    const { handleSubmit, reset } = formMethods;
    (0, react_1.useEffect)(() => {
        reset(hotel);
    }, [hotel, reset]);
    const onSubmit = handleSubmit((formDataJson) => {
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });
        // [img1, img2, img3]
        // [img1]
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });
        onSave(formData);
    });
    return (<react_hook_form_1.FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailsSection_1.default />
        <TypeSection_1.default />
        <FacilitiesSection_1.default />
        <GuestsSection_1.default />
        <ImagesSection_1.default />
        <span className='flex justify-end'>
          <button disabled={isLoading} type='submit' className='p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500 disabled:bg-gray-500'>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </react_hook_form_1.FormProvider>);
};
exports.default = ManageHotelForm;
