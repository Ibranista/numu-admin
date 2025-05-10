// self-note: remember to put file size limitations
import * as Yup from "yup";

export const therapistInitialValues = {
    name: "",
    image: null,
    expertise_ids: [],
    experience_years: null,
    bio: "",
};

export const therapistSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed()
        .required("Image is required")
        .test(
            "fileType",
            "Only image files are allowed",
            (value) =>
                value instanceof File &&
                ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type)
        )
        .test(
            "fileSize",
            "Image size must not exceed 5 MB",
            (value) =>
                value instanceof File &&
                value.size <= 5 * 1024 * 1024
        ),
    expertise_ids: Yup.array()
        .of(Yup.string().required())
        .min(1, "At least one expertise is required"),
    experience_years: Yup.number()
        .min(0, "Experience years must be 0 or more")
        .required("Experience years is required"),
    bio: Yup.string().required("Bio is required"),
});