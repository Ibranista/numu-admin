export interface ITherapistMatch {
    id: string,
    child: string,
    therapist: string,
    status: 'pending' | 'declined' | 'accepted',
    decline_reason: string,
}

export interface ITherapistMatchesState {
    data: ITherapistMatch[];
    loading: boolean;
    error: string | null;
}