import { Timestamp } from "firebase/firestore";

export interface UserDBProps{
    id: string;
    name: string;
    email: string;
    image: string;
    interas: number;
    created: Timestamp;
}

export interface UserProps{
    id: string;
    name: string;
    email: string;
    image: string;
    interas: number;
    created: string;
}