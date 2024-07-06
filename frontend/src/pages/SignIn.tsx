import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className='flex flex-col gap-5'
      onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Sign In</h2>

      <label className='flex-1 text-sm font-bold text-gray-700'>
        Email
        <input
          type='email'
          className='w-full px-2 py-1 font-normal border rounded'
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='flex-1 text-sm font-bold text-gray-700'>
        Password
        <input
          type='password'
          className='w-full px-2 py-1 font-normal border rounded'
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 character",
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?
          <Link
            to='/register'
            className='underline'>
            Create an account here
          </Link>
        </span>
        <button
          type='submit'
          className='p-2 text-xl font-bold text-white bg-pink-600 hover:bg-pink-500'>
          Login
        </button>
      </span>
    </form>
  );
};
export default SignIn;
