"use client"
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import cookie from 'js-cookie';
import Link from "next/link";
import jwt from "jsonwebtoken";

import { db } from '../../services/firebaseConnection';
import { doc, collection, query, where, getDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'

import bcrypt from 'bcryptjs';

import logo from '../../../public/logo.png';
import styles from './login.module.scss';


interface UserProps {
    name: string,
    login: string,
    password: string,
    interas: number,
    created: Date,
}

export default function Login() {

    const router = useRouter();

    //JSON WEB TOKEN
    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    async function loginClient(event: FormEvent) {
        event.preventDefault();

        if (login === "" || password === "") {
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

                    if (match) {
                        const token = jwt.sign(user.login, SECRET_KEY);
                        await cookie.set('sessionId', token);
                        alert("logado com sucesso!")
                        router.push('/');
                    } else {
                        alert("Login ou senha incorretos")
                    }

                }

            } else {
                console.log("Usuário não encontrado.");
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <main className={styles.main}>
            <section>
                <Image src={logo} alt="Logo Interconnect"/>
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
                            <PiEyeLight size={24} color="#393939" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                            :
                            <PiEyeClosedLight size={24} color="#393939" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                        }
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link href="/register">Ou cadastre-se</Link>
            </section>
        </main>
    )
}