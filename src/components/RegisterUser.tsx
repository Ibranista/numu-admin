import { useFormik } from "formik";
import { useEffect } from "react";
import { onAuthChange } from "../firebase";
import {
  initialState,
  registerUserSchema as validationSchema,
} from "../schema/auth.schema";
import { registerUser } from "../features/auth/thunk.api";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import api from "../services/api.service";
import { clearAuth, setUser } from "../features/auth/auth.slice";
import { selectAuthUser } from "../features/auth/selector";
import Spinner from "./Spinner";

const RegisterUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const { loading, error } = authUser ?? {};
  console.log("the user-->", error);
  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      if (currentUser) {
        const firebaseUid = currentUser.uid;
        try {
          const response = await api.get(`/user/profile/${firebaseUid}/`);
          const profileData = await response.data;
          dispatch(setUser(profileData));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        clearAuth();
      }
    });

    return () => unsubscribe();
  }, []);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <form className="space-y-4 w-full max-w-md" onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-bold">Create User</h2>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          formik.touched.first_name && formik.errors.first_name
            ? "border-red-500"
            : ""
        }`}
      />
      {formik.touched.first_name && formik.errors.first_name && (
        <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
      )}

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          formik.touched.last_name && formik.errors.last_name
            ? "border-red-500"
            : ""
        }`}
      />
      {formik.touched.last_name && formik.errors.last_name && (
        <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
      )}

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

      <select
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          formik.touched.role && formik.errors.role ? "border-red-500" : ""
        }`}
      >
        <option value="parent">Parent</option>
        <option value="admin">Admin</option>
      </select>
      {formik.touched.role && formik.errors.role && (
        <div className="text-red-500 text-sm">{formik.errors.role}</div>
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
        {loading ? <Spinner /> : "Create Account"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default RegisterUser;
