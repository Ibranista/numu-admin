import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginInitialState, loginSchema } from "../schema/auth.schema";
import { selectAuthUser } from "../features/auth/selector";
import Spinner from "./Spinner";
import { loginUser } from "../features/auth/thunk.api";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const { loading, error } = authUser ?? {};
  console.log({ loading, error });
  const formik = useFormik({
    initialValues: loginInitialState,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <form className="space-y-4 w-full max-w-md" onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          formik.touched.email && formik.errors.email ? "border-red-500" : ""
        }`}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm">{formik.errors.email}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          formik.touched.password && formik.errors.password
            ? "border-red-500"
            : ""
        }`}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
      )}

      <button
        disabled={loading}
        type="submit"
        className={`${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } w-full p-2 rounded bg-purple-500 hover:bg-purple-600 focus:outline-none`}
      >
        {loading ? <Spinner /> : "Login"}
      </button>
      {error && <div className="text-red-500 text-sm">Invalid Credentials</div>}
    </form>
  );
};

export default Login;
