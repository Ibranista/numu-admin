import * as Yup from "yup";

export const concernInitialValues = {
    concerns: [
        { title: "", description: "" },
    ],
};

export const concernSchema = Yup.object().shape({
    concerns: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().required("Title is required"),
                description: Yup.string().required("Description is required"),
            })
        )
        .min(1, "At least one concern is required"),
});
