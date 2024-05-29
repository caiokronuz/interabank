import { Timestamp } from "firebase/firestore";

export interface UserProps{
    name: string;
    login: string;
    password: string;
    interas: number;
    created: Timestamp;
}