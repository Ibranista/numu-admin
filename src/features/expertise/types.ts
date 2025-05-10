export interface IExpertise {
    id?: string;
    expertise: string[];
}

export interface IExpertiseState {
    expertise: IExpertise[];
    loading: boolean;
    error: string | null;
};