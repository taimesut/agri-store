import { useForm } from "react-hook-form";
import type { LoginRequest } from "../../utils/types";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthApi } from "../../apis/auth.api";
import { useCurrentUserStore } from "../../stores/useCurrentUserStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const navigate = useNavigate();

  const { fetchCurrentUser } = useCurrentUserStore();

  const onSubmit = async (payload: LoginRequest) => {
    try {
      await AuthApi.Login(payload);
      await fetchCurrentUser();
      toast.success("Đăng nhập thành công");
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Đăng nhập
      </h2>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="text"
          placeholder="example@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
        />
        {errors.password?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
  );
}
