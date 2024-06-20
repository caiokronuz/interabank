import { Timestamp } from "firebase/firestore";

export interface UserDBProps{
    name: string;
    email: string;
    image: string;
    interas: number;
    created: Timestamp;
}

export interface UserProps{
    name: string;
    email: string;
    image: string;
    interas: number;
    created: string;
}