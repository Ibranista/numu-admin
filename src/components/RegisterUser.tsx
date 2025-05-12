import { useFormik } from "formik";
import {
  initialState,
  registerUserSchema as validationSchema,
} from "../schema/auth.schema";
import { registerUser } from "../features/auth/thunk.api";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectAuthUser } from "../features/auth/selector";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const RegisterUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const { loading, error } = authUser ?? {};

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(registerUser(values));
      if (result.type === "auth/registerUser/fulfilled") {
        toast.success("Account created successfully!");
      } else if (result.type === "auth/registerUser/rejected") {
        toast.error(error || "Failed to create account");
      }
    },
  });

  return (
    <form className="space-y-6 w-full max-w-2xl" onSubmit={formik.handleSubmit}>
      <h2 className="text-4xl font-bold">Create User</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-6 text-xl rounded bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 ${
          formik.touched.first_name && formik.errors.first_name
            ? "border-4 border-red-500"
            : ""
        }`}
      />
      {formik.touched.first_name && formik.errors.first_name && (
        <div className="text-red-500 text-lg">{formik.errors.first_name}</div>
      )}

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-6 text-xl rounded bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 ${
          formik.touched.last_name && formik.errors.last_name
            ? "border-4 border-red-500"
            : ""
        }`}
      />
      {formik.touched.last_name && formik.errors.last_name && (
        <div className="text-red-500 text-lg">{formik.errors.last_name}</div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-6 text-xl rounded bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 ${
          formik.touched.email && formik.errors.email
            ? "border-4 border-red-500"
            : ""
        }`}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-lg">{formik.errors.email}</div>
      )}

      <select
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-6 text-xl rounded bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 ${
          formik.touched.role && formik.errors.role
            ? "border-4 border-red-500"
            : ""
        }`}
        defaultValue={"admin"}
        disabled
      >
        <option value="admin">Admin</option>
        {/* <option value="parent">Parent</option> */}
      </select>
      {formik.touched.role && formik.errors.role && (
        <div className="text-red-500 text-lg">{formik.errors.role}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-6 text-xl rounded bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 ${
          formik.touched.password && formik.errors.password
            ? "border-4 border-red-500"
            : ""
        }`}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-lg">{formik.errors.password}</div>
      )}

      <button
        disabled={loading}
        type="submit"
        className={`${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } w-full p-6 text-2xl font-semibold rounded bg-purple-500 hover:bg-purple-600 focus:outline-none`}
      >
        {loading ? <Spinner /> : "Create Account"}
      </button>

      {error && <div className="text-red-500 text-lg">{error}</div>}
    </form>
  );
};

export default RegisterUser;
