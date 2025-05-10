export interface IConcern {
    id?: string;
    title: string;
    description: string;
    results?: IConcern[];
}

export interface IConcernState {
    concerns: IConcern[];
    loading: boolean;
    error: string | null;
};