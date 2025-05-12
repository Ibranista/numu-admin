import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginInitialState, loginSchema } from "../schema/auth.schema";
import { selectAuthUser } from "../features/auth/selector";
import Spinner from "./Spinner";
import { loginUser } from "../features/auth/thunk.api";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const { loading, error } = authUser ?? {};
  console.log({ loading, error });
  const formik = useFormik({
    initialValues: loginInitialState,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await dispatch(loginUser(values));
      if (result.type === "auth/loginUser/fulfilled") {
        toast.success("Logged in successfully!");
      } else if (result.type === "auth/loginUser/rejected") {
        toast.error("Invalid credentials. Please try again.");
      }
    },
  });

  return (
    <form className="space-y-6 w-full max-w-2xl" onSubmit={formik.handleSubmit}>
      <h2 className="text-4xl font-bold">Login</h2>

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
        {loading ? <Spinner /> : "Login"}
      </button>

      {error && <div className="text-red-500 text-lg">Invalid Credentials</div>}
    </form>
  );
};

export default Login;
