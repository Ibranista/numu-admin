export interface IConcern {
    id?: string;
    title: string;
    description: string;
}

export interface IConcernState {
    concerns: IConcern[];
    loading: boolean;
    error: string | null;
};