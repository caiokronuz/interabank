"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoIosLogOut } from "react-icons/io";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { toggle } from '../../store/booleanSlice'

import logo from '../../../public/logo.png';
import styles from './header.module.scss'
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {auth} from "@/lib/auth"

export function Header() {

    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)
    const dispatch = useDispatch();

    function handleLogout(){
        const confirm = window.confirm("Você deseja deslogar da sua conta?")
        if(confirm){
            signOut();
        }
    }
    

    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <Image
                    src={logo}
                    alt="Logo Interconnect"
                    quality={100}
                    priority
                />
            </Link>

            <div className={styles.buttons}>
                {isBalanceVisible ?
                    <FaRegEyeSlash size={26} color="#FFF" onClick={() => dispatch(toggle())} />
                    :
                    <FaRegEye size={25} color="#FFF" onClick={() => dispatch(toggle())} />
                }
                <IoIosLogOut onClick={handleLogout} size={25} color="red" />
            </div>
        </header>
    )
}