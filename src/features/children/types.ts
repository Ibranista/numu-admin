export interface IParentUserProfile {
    firebase_uid: string;
    role: string;
}

export interface IParent {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    userprofile: IParentUserProfile;
}

export interface IConcern {
    id: number;
    title: string;
    description: string;
}

export interface IExpertise {
    id: number;
    expertise: string;
}

export interface ITherapist {
    id: number;
    name: string;
    image: string;
    expertise: IExpertise[];
    experience_years: number;
    bio: string;
    createdDate: string;
}

export interface ITherapistMatch {
    id: number;
    therapist: ITherapist;
    status: string;
    decline_reason: string;
    created_at: string;
    updated_at: string;
}

export interface IChild {
    id: number;
    name: string;
    gender: string;
    birthDate: string;
    parent: IParent;
    concerns: IConcern[];
    therapist_matches: ITherapistMatch[];
    acceptedTherapists: any[];
}

export interface IChildrenResponse {
    total: number;
    page: number;
    limit: number;
    results: IChild[];
}

export interface IChildrenState {
    children: IChildrenResponse | null;
    loading: boolean;
    error: string | null;
}

export interface IGetChildrenArgs {
    page?: number;
    limit?: number;
}

export interface ISuggestTherapistPayload {
    child: number,
    therapist: number,
    status: "pending",
    decline_reason: "",
}