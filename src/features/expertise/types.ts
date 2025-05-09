export interface IExpertise {
    expertise: string[];
}

export interface IExpertiseState {
    expertise: IExpertise[];
    loading: boolean;
    error: string | null;
};