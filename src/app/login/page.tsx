"use client"
import { FormEvent, useState } from "react";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";

import styles from './login.module.scss';
import Link from "next/link";

export default function Login(){
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function loginClient(event: FormEvent){
        event.preventDefault();

        if (login === "" || password === ""){
            return;
        }

        alert(`login: ${login} password: ${password} | USUÁRIO LOGADO`)
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