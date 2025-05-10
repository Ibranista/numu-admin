export interface ITherapist {
    id: any;
    name: string;
    image: File | null;
    experience_years: number | null;
    bio: string;
    expertise_ids: string[];
    expertise: {
        id: any;
        expertise: string;
    }[]
}

export interface ITherapistState {
    therapists: ITherapist[];
    loading: boolean;
    error: string | null;
    therapistId: string | null;
    therapistLoading: boolean;
    therapistError: string | null;
}
