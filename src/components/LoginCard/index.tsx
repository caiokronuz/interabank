"use client"

import { FaGoogle } from "react-icons/fa";
import logo from '../../../public/logo.png';
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

import style from './loginCard.module.scss';

export function LoginCard() {
    return (
        <section className={style.loginCard}>
            <Image src={logo} alt="Logo Interconnect" />
            <button onClick={() => signIn()}><FaGoogle size={24} color="#fff"/>Entrar com Google</button>
        </section>
    )
}