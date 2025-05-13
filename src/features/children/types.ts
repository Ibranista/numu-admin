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

// {
//     "total": 1,
//     "page": 1,
//     "limit": 5,
//     "results": [
//         {
//             "id": 1,
//             "name": "Child name",
//             "gender": "male",
//             "birthDate": "2025-05-05",
//             "parent": {
//                 "id": 1,
//                 "username": "ipqdQmSlVJcOcAfF3XCaLpurAAf2",
//                 "email": "parent@parent.com",
//                 "first_name": "parent",
//                 "last_name": "parent",
//                 "userprofile": {
//                     "firebase_uid": "ipqdQmSlVJcOcAfF3XCaLpurAAf2",
//                     "role": "user"
//                 }
//             },
//             "concerns": [
//                 {
//                     "id": 1,
//                     "title": "concern one",
//                     "description": "concern description"
//                 }
//             ],
//             "languages": [
//                 "arabic",
//                 "french"
//             ],
//             "has_emotional_distress_signs": false,
//             "is_behavior_challenging": false,
//             "struggle_with_social": false,
//             "child_activeness": false,
//             "has_difficulty_movement": false,
//             "has_learning_problems": false,
//             "has_communication_problems": false,
//             "has_meal_problems": false,
//             "has_difficulty_with_sleep": false,
//             "did_we_miss_anything": "More info.",
//             "therapist_matches": [],
//             "acceptedTherapists": []
//         }
//     ]
// }

export interface IChild {
    id: number;
    name: string;
    gender: string;
    birthDate: string;
    parent: IParent;
    concerns: IConcern[];
    therapist_matches: ITherapistMatch[];
    acceptedTherapists: any[];
    languages: string[];
    has_emotional_distress_signs: boolean;
    is_behavior_challenging: boolean;
    struggle_with_social: boolean;
    child_activeness: boolean;
    has_difficulty_movement: boolean;
    has_learning_problems: boolean;
    has_communication_problems: boolean;
    has_meal_problems: boolean;
    has_difficulty_with_sleep: boolean;
    did_we_miss_anything: string;
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