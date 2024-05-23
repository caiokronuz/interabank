"use client"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import bcrypt from 'bcryptjs'

import { db } from "../../services/firebaseConnection";
import {
    addDoc,
    collection
} from 'firebase/firestore'


import styles from './register.module.scss';
import Link from "next/link";

export default function Register(){
    const router = useRouter();
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    async function loginClient(event: FormEvent){
        event.preventDefault();

        if (name === "" || login === "" || password === "" || password2 === ""){
            return;
        }

        if (password != password2){
            alert("As senhas não batem")
            return;
        }

        try{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await addDoc(collection(db, "users"),{
                name: name,
                login: login,
                password: hashedPassword,
                interas: 0,
                created: new Date(),
            })
            alert("Usuário cadastrado com sucesso!")
            router.push("/login")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <main className={styles.main}>
            <form onSubmit={loginClient}>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Digite nome completo" 
                    onChange={e => setName(e.target.value)}
                />
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
                <input type={isPasswordVisible ? "text" : "password"} 
                        name="password2" 
                        id="password2"  
                        placeholder="Repita sua senha" 
                        onChange={e => setPassword2(e.target.value)} 
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link href="/login">Ou faça login</Link>
        </main>
    )
}