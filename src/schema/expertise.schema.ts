import * as Yup from 'yup';
import type { IExpertise } from '../features/expertise/types';

export const expertiseInitialValues: IExpertise = {
    expertise: [""],
};

export const expertiseSchema = Yup.object().shape({
    expertise: Yup.array()
        .of(Yup.string().required("Expertise is required"))
        .min(1, "At least one expertise is required"),
});