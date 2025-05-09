import { useFormik } from "formik";
import Spinner from "../Spinner";
import {
  expertiseInitialValues,
  expertiseSchema,
} from "../../schema/expertise.schema";
import type { IExpertise } from "../../features/expertise/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createExpertise } from "../../features/expertise/thunk.api";
import { clearExpertise } from "../../features/expertise/expertise.slice";
import { DeleteIcon, PlusIcon } from "../../assets/icons";

const ExpertiseForm = () => {
  const dispatch = useAppDispatch();
  const expertiseData = useAppSelector((state) => state.expertise);
  const { loading, error } = expertiseData ?? {};

  const formik = useFormik<IExpertise>({
    initialValues: expertiseInitialValues,
    validationSchema: expertiseSchema,
    onSubmit: (values) => {
      dispatch(createExpertise(values));
      dispatch(clearExpertise());
      formik.resetForm();
    },
  });

  const handleAddField = () => {
    formik.setFieldValue("expertise", [...formik.values.expertise, ""]);
  };

  const handleRemoveField = (index: number) => {
    const newExpertise = formik.values.expertise.filter((_, i) => i !== index);
    formik.setFieldValue("expertise", newExpertise);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add Expertise
      </h2>

      <main className="space-y-3 mb-4">
        {formik.values.expertise.map((exp, idx) => (
          <section key={idx} className="flex items-start space-x-2">
            <article className="flex-1">
              <input
                type="text"
                name={`expertise[${idx}]`}
                value={exp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Expertise #${idx + 1}`}
                className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 ${
                  (formik.touched.expertise as any)?.[idx] &&
                  formik.errors.expertise?.[idx]
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              {(formik.touched.expertise as any)?.[idx] &&
                formik.errors.expertise?.[idx] && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.expertise[idx]}
                  </div>
                )}
            </article>

            {formik.values.expertise.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField(idx)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove expertise"
              >
                <DeleteIcon />
              </button>
            )}
          </section>
        ))}
      </main>

      <div className="flex flex-col space-y-3">
        <button
          type="button"
          onClick={handleAddField}
          className="flex items-center justify-center text-sm text-primary hover:text-primary-hover transition-colors"
        >
          <PlusIcon />
          Add another expertise
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 rounded-md text-white text-sm font-medium ${
            loading
              ? "bg-primary-hover cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover"
          } transition-colors`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Spinner variation="large" />
              Processing...
            </span>
          ) : (
            "Save Expertise"
          )}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      {formik.errors.expertise &&
        typeof formik.errors.expertise === "string" && (
          <div className="text-red-500 text-xs mt-2">
            {formik.errors.expertise}
          </div>
        )}
    </form>
  );
};

export default ExpertiseForm;
