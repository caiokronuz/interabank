"use client"
import { FormEvent, useState } from "react";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";

import { db } from '../../services/firebaseConnection';
import {doc, collection, query, where, getDoc, getDocs, addDoc, deleteDoc} from 'firebase/firestore'

import bcrypt from 'bcryptjs';

import styles from './login.module.scss';
import Link from "next/link";

interface UserProps{
    name: string,
    login: string,
    password: string,
    interas: number,
    created: Date,
}

export default function Login(){
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    async function loginClient(event: FormEvent){
        event.preventDefault();

        if (login === "" || password === ""){
            return;
        }

        try {
            const q = query(collection(db, "users"), where("login", "==", login));
            const snapshotAccount = await getDocs(q);
        
            if (!snapshotAccount.empty) {
                const userDoc = snapshotAccount.docs[0];
                const userData = userDoc.data() as UserProps; // Tipando os dados como User
        
                if (userData) {
                    const user: UserProps = {
                        login: userData.login,
                        name: userData.name,
                        created: userData.created,
                        password: userData.password,
                        interas: userData.interas
                    };
                    
                    const match = await bcrypt.compare(password, user.password);
                    
                    if(match){
                        alert("LOGADO")
                    }else{
                        alert("VAGABUNDO")
                    }

                }

            } else {
                console.log("Usuário não encontrado.");
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    return(
        <main className={styles.main}>
            <form onSubmit={loginClient}>
                <input 
                    type="text" 
                    name="account" 
                    id="account" 
                    placeholder="Digite seu usuário" 
                    onChange={e => setLogin(e.target.value)}
                />
                <div className={styles.passwordInput}>
                    <input type={isPasswordVisible ? "text" : "password"} 
                        name="password" 
                        id="password"  
                        placeholder="Digite sua senha" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    {isPasswordVisible ? 
                    <PiEyeLight size={24} color="#393939" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/> 
                        : 
                    <PiEyeClosedLight size={24} color="#393939" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                    }
                </div>
                <button type="submit">Login</button>
            </form>
            <Link href="/register">Ou cadastre-se</Link>
        </main>
    )
}