import { Timestamp } from "firebase/firestore";

export interface UserDBProps{
    name: string;
    login: string;
    interas: number;
    created: Timestamp;
}

export interface UserProps{
    id: string;
    name: string;
    login: string;
    interas: number;
    created: string;
}