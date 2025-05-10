import type { ITherapistState } from "./types";

export const initialState: ITherapistState = {
    loading: false,
    error: null,
    therapists: [],
    therapistId: null,
    therapistLoading: false,
    therapistError: null,
};
