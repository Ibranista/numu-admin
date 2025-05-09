export interface IUser {
    uid?: string;
    firebase_uid?: string;
    role: string;
    email: string;
    first_name: string;
    last_name: string;
    password?: string;
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
    loading: boolean;
    error: string | null;
}

export interface IProfileState {
    profile: IUserProfile | null;
    loading: boolean;
    error: string | null;
}