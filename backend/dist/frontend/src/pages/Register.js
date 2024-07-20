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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_query_1 = require("@tanstack/react-query");
const apiClient = __importStar(require("../api-client"));
const AppContext_1 = require("../contexts/AppContext");
const react_router_dom_1 = require("react-router-dom");
const Register = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { showToast } = (0, AppContext_1.useAppContext)();
    const { register, watch, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const mutation = (0, react_query_1.useMutation)({
        mutationFn: apiClient.register,
        onSuccess: () => __awaiter(void 0, void 0, void 0, function* () {
            showToast({ message: "Registration Successful!", type: "SUCCESS" });
            yield queryClient.invalidateQueries({ queryKey: ["ValidationToken"] });
            navigate("/");
        }),
        onError: (error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    return (<form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col gap-5 md:flex-row'>
        <label className='flex-1 text-sm font-bold text-gray-700'>
          First Name
          <input type='text' className='w-full px-2 py-1 font-normal border rounded outline outline-1 outline-offset-2' {...register("firstName", { required: "This field is required" })}/>
          {errors.firstName && (<span className='text-red-500'>{errors.firstName.message}</span>)}
        </label>

        <label className='flex-1 text-sm font-bold text-gray-700'>
          Last Name
          <input type='text' className='w-full px-2 py-1 font-normal border rounded' {...register("lastName", { required: "This field is required" })}/>
          {errors.lastName && (<span className='text-red-500'>{errors.lastName.message}</span>)}
        </label>
      </div>
      <label className='flex-1 text-sm font-bold text-gray-700'>
        Email
        <input type='email' className='w-full px-2 py-1 font-normal border rounded' {...register("email", { required: "This field is required" })}/>
        {errors.email && (<span className='text-red-500'>{errors.email.message}</span>)}
      </label>
      <label className='flex-1 text-sm font-bold text-gray-700'>
        Password
        <input type='password' className='w-full px-2 py-1 font-normal border rounded' {...register("password", {
        required: "This field is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 character",
        },
    })}/>
        {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
      </label>
      <label className='flex-1 text-sm font-bold text-gray-700'>
        Confirm Password
        <input type='password' className='w-full px-2 py-1 font-normal border rounded' {...register("confirmPassword", {
        validate: (val) => {
            if (!val) {
                return "This field is required";
            }
            else if (watch("password") !== val) {
                return "Your passwords do not match";
            }
        },
    })}/>
        {errors.confirmPassword && (<span className='text-red-500'>{errors.confirmPassword.message}</span>)}
      </label>
      <span>
        <button type='submit' className='p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
          Create Account
        </button>
      </span>
    </form>);
};
exports.default = Register;
