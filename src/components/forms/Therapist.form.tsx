import { useFormik } from "formik";
import Spinner from "../Spinner";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectTherapist } from "../../features/therapists/selector";
import { selectExpertise } from "../../features/expertise/selector";
import type { ITherapist } from "../../features/therapists/types";
import {
  therapistInitialValues,
  therapistSchema,
} from "../../schema/therapist.schema";
import { createTherapist } from "../../features/therapists/thunk.api";

const TherapistForm = () => {
  const dispatch = useAppDispatch();
  const therapistData = useAppSelector(selectTherapist);
  const expertiseData = useAppSelector(selectExpertise);
  const { expertise: expertiseList, loading: expertiseLoading } =
    expertiseData ?? {};

  const { loading, error } = therapistData ?? {};
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file);
    }
  };

  const formik = useFormik<ITherapist>({
    initialValues: therapistInitialValues,
    validationSchema: therapistSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("experience_years", String(values.experience_years));
      values.expertise_ids.forEach((id) => {
        formData.append("expertise_ids", id);
      });

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      dispatch(createTherapist(formData));
      formik.resetForm();
      setPreviewUrl(null);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add Therapist
      </h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 ${
            formik.touched.name && formik.errors.name
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary"
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          // onBlur={formik.handleBlur}
          className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 ${
            formik.touched.image && formik.errors.image
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary"
          }`}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover mx-auto my-2 border-2 border-primary"
          />
        )}
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.image}</div>
        )}
      </div>

      <div>
        <select
          multiple
          name="expertise_ids"
          value={formik.values.expertise_ids}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 min-h-[60px] ${
            formik.touched.expertise_ids && formik.errors.expertise_ids
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary"
          }`}
        >
          {expertiseLoading ? (
            <option>Loading...</option>
          ) : (
            expertiseList.map((exp, key) => (
              <option key={key} value={exp.id}>
                {exp.expertise}
              </option>
            ))
          )}
        </select>
        {formik.touched.expertise_ids && formik.errors.expertise_ids && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.expertise_ids}
          </div>
        )}
      </div>

      <div>
        <input
          type="number"
          name="experience_years"
          placeholder="Experience Years"
          value={formik.values.experience_years ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={0}
          className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 ${
            formik.touched.experience_years && formik.errors.experience_years
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary"
          }`}
        />
        {formik.touched.experience_years && formik.errors.experience_years && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.experience_years}
          </div>
        )}
      </div>

      <div>
        <textarea
          name="bio"
          placeholder="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 resize-y ${
            formik.touched.bio && formik.errors.bio
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary"
          }`}
        />
        {formik.touched.bio && formik.errors.bio && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.bio}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`cursor-pointer w-full py-2 px-4 rounded-md text-white text-sm font-medium ${
          loading
            ? "bg-primary-hover cursor-not-allowed"
            : "bg-primary hover:bg-primary-hover"
        } transition-colors`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Spinner variation="large" />
          </span>
        ) : (
          "Add Therapist"
        )}
      </button>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};

export default TherapistForm;
