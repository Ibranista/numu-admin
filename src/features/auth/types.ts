export interface IUser {
    uid: string;
    role: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface IUserProfile {
    firebase_uid: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "parent" | "admin";
}

export interface AuthState {
    user: IUser | null;
    profile: IUserProfile | null;
    loading: boolean;
    error: string | null;
}