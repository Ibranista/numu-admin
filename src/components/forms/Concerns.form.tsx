import { useFormik } from "formik";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectConcerns } from "../../features/concerns/selector";
import * as Yup from "yup";
import { createConcerns } from "../../features/concerns/thunk.api";
import { DeleteIcon, PlusIcon } from "../../assets/icons";
import { toast } from "react-hot-toast";

const concernInitialValues = {
  concerns: [{ title: "", description: "" }],
};

const concernSchema = Yup.object().shape({
  concerns: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      })
    )
    .min(1, "At least one concern is required"),
});

const ConcernsForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectConcerns) ?? {};

  const formik = useFormik({
    initialValues: concernInitialValues,
    validationSchema: concernSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createConcerns(values)).unwrap();
        toast.success("Concerns registered successfully!");
        resetForm();
      } catch (err: any) {
        console.log(err);
        toast.error(err?.[0]?.title?.[0] || "Failed to register concerns");
      }
    },
  });

  const handleAddField = () => {
    formik.setFieldValue("concerns", [
      ...formik.values.concerns,
      { title: "", description: "" },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const newConcerns = formik.values.concerns.filter((_, i) => i !== index);
    formik.setFieldValue("concerns", newConcerns);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Concerns</h2>

      <main className="space-y-3 mb-4">
        {formik.values.concerns.map((concern, idx) => (
          <section
            key={idx}
            className="flex flex-col space-y-2 border-b pb-4 mb-2"
          >
            <div className="flex items-start space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  name={`concerns[${idx}].title`}
                  value={concern.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Concern Title #${idx + 1}`}
                  className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 ${
                    (formik.touched.concerns as any)?.[idx]?.title &&
                    (formik.errors.concerns as any)?.[idx]?.title
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />
                {(formik.touched.concerns as any)?.[idx]?.title &&
                  (formik.errors.concerns as any)?.[idx]?.title && (
                    <div className="text-red-500 text-xs mt-1">
                      {(formik.errors.concerns as any)[idx].title}
                    </div>
                  )}
              </div>
              {formik.values.concerns.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(idx)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove concern"
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
            <div>
              <textarea
                name={`concerns[${idx}].description`}
                value={concern.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Description"
                rows={3}
                className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 resize-y ${
                  (formik.touched.concerns as any)?.[idx]?.description &&
                  (formik.errors.concerns as any)?.[idx]?.description
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />
              {(formik.touched.concerns as any)?.[idx]?.description &&
                (formik.errors.concerns as any)?.[idx]?.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {(formik.errors.concerns as any)[idx].description}
                  </div>
                )}
            </div>
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
          Add another concern
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer py-2 px-4 rounded-md text-white text-sm font-medium ${
            loading
              ? "bg-primary-hover cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover"
          } transition-colors`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Spinner variation="large" label="...creating" />
            </span>
          ) : (
            "Save Concerns"
          )}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      {formik.errors.concerns && typeof formik.errors.concerns === "string" && (
        <div className="text-red-500 text-xs mt-2">
          {formik.errors.concerns}
        </div>
      )}
    </form>
  );
};

export default ConcernsForm;
